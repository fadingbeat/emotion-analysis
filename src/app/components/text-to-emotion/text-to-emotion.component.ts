import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TextToEmotionService } from 'src/app/services/text-to-emotion.service';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
    Emotion,
    EmotionsNormalized,
    EMOTION_COLOR_MAP,
    EmotionAnalysisError,
    HEX_TO_COLOR_NAME,
    getColorName,
} from 'src/app/core/models/types';
import {
    EmotionType,
    EmotionDropdownOption,
} from 'src/app/core/models/emotions';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/core/error-handling/error-dialog/error-dialog.component';

@Component({
    selector: 'app-text-to-emotion',
    templateUrl: './text-to-emotion.component.html',
    styleUrls: ['./text-to-emotion.component.scss'],
})
export class TextToEmotionComponent implements OnInit {
    @ViewChild('prompt') inputName!: ElementRef<HTMLInputElement>;

    constructor(
        private textToEmotionService: TextToEmotionService,
        private responsive: BreakpointObserver,
        public router: Router,
        private dialog: MatDialog,
    ) {}
    sentence = '';
    userInput = '';
    description =
        'The application detects emotions based on given input and provides more info about the emotion and colors associated with it. You will be suggested with a guided visualization to help you deal with your feelings.The analyzer currently works with five emotions. You can either use analyzer for emotion detection, or if you already know what you are feeling, choose the emotion from the dropdown menu. ';
    filteredEmotions: Record<string, number> = {};
    detectedEmotions: string[] = [];
    transformedColorsList: EmotionDropdownOption[] = [];
    regex = '(?<==)(.|\n)*[^=;]';
    emotionDescription: '';
    statusLoaded = false;
    colorComponentLoaded = false;
    ifHandsetPortrait = false;
    ifHandsetLandscape = false;
    ifWeb = false;
    uuid = '';
    loadingSpinner = false;
    buttonClicked = false;

    // taking values from emotions_normalized object, storing and displaying only value (emotion) with the highest score
    emotionsNormalized!: EmotionsNormalized;

    // emoticons
    emojis = {
        joy: '\u{1F60D}',
        sadness: '\u{1F97A}',
        surprise: '\u{1F62E}',
        fear: '\u{1F628}',
        disgust: '\u{1F922}',
        anger: '\u{1F620}',
        neutral: '\u{1F610}',
    };

    emo = '&#128512';
    promptControl = new FormControl('');
    prompts: string[] = [
        'I am going to see my mom after two weeks.',
        'We entered a contest and won the second place. What an astonishment for our team!',
        'Yesterday during our walk through the forest we saw a giant bird flying towards us and we run as quickly as possible to the car.',
        'My cousin passed away almost two years ago. He left two kids and a wife behind. Such a tragedy.',
        'Last night there was such a huge thunderstorm, the electricity was on and off, it was scary to say the least.',
        'My parents celebrated their 70th anniversary.',
        'I have been working hard whole summer and now I have deserved to take a vacation and enjoy the seaside.',
    ];
    filteredPrompts: Observable<string[]>;

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.prompts.filter((option) =>
            option.toLowerCase().includes(filterValue),
        );
    }

    ngOnInit() {
        this.filteredPrompts = this.promptControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || '')),
        );

        this.responsive
            .observe([
                Breakpoints.HandsetPortrait,
                Breakpoints.HandsetLandscape,
                Breakpoints.Web,
            ])
            .subscribe((result) => {
                this.ifHandsetPortrait = false;
                this.ifHandsetLandscape = false;
                this.ifWeb = false;
                const breakpoints = result.breakpoints;
                if (breakpoints[Breakpoints.HandsetPortrait]) {
                    this.ifHandsetPortrait = true;
                } else if (breakpoints[Breakpoints.HandsetLandscape]) {
                    this.ifHandsetLandscape = true;
                } else if (breakpoints[Breakpoints.Web]) {
                    this.ifWeb = true;
                }
            });
        // this.testEmotionService();
    }

    // ✅ Test function
    async testEmotionService() {
        console.log('🧪 Testing EmotionAnalysisError handling...');

        try {
            // Test 1: Empty sentence (should throw error)
            await this.textToEmotionService.getEmotions('');
        } catch (error) {
            if (error instanceof EmotionAnalysisError) {
                console.log('✅ Test 1 PASSED: Caught EmotionAnalysisError');
                console.log('   Code:', error.code); // Should be 'INVALID_INPUT'
                console.log('   Message:', error.message);
            } else {
                console.log('❌ Test 1 FAILED: Wrong error type');
            }
        }

        try {
            // Test 2: Valid sentence
            const result = await this.textToEmotionService.getEmotions(
                'I am very happy with my progress today',
            );
            console.log('✅ Test 2 PASSED: Got valid Emotion response');
            console.log(
                '   Result has emotions_normalized:',
                'emotions_normalized' in result,
            );
            console.log('   Joy score:', result.emotions_normalized.joy);
        } catch (error) {
            console.log('❌ Test 2 FAILED:', error);
        }
    }

    analyzeSentence() {
        this.statusLoaded = false;
        this.emotionsNormalized = {} as EmotionsNormalized;
        this.filteredEmotions = {};
        this.detectedEmotions = [];
        this.transformedColorsList = [];
        // ✅ Validate before API call
        if (!this.sentence || this.sentence.trim().length === 0) {
            this.showErrorNotification('Please enter a sentence to analyze');
            return; // Don't call API
        }

        // ✅ Optional: Add word count check
        const wordCount = this.sentence.trim().split(/\s+/).length;
        if (wordCount < 7) {
            this.showErrorNotification('Please enter at least 7 words');
            return;
        }

        this.loadingSpinner = true;

        (this.textToEmotionService.getEmotions(this.sentence).then((res) => {
            this.emotionsNormalized = res.emotions_normalized;
            this.statusLoaded = true;

            for (const [key, score] of Object.entries(
                this.emotionsNormalized,
            )) {
                if (score > 0) {
                    this.filteredEmotions[key] = score;
                }
            }

            this.detectedEmotions = Object.keys(this.filteredEmotions);

            this.loadingSpinner = false;
            this.buttonClicked = true;
            this.getColorsVisualizations();

            this.sentence = '';
            this.inputName.nativeElement.value = '';
            document.getElementById('emotional-status')?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
            });
            this.router.navigateByUrl('home');
        }).catch,
            (error: unknown) => {
                // ✅ Handle errors properly
                this.loadingSpinner = false;
                if (error instanceof EmotionAnalysisError) {
                    console.error(`[${error.code}] ${error.message}`);
                    this.showErrorNotification(error.message);
                } else {
                    console.error('Unexpected error:', error);
                    this.showErrorNotification('An unexpected error occurred');
                }
            });
    }

    showErrorNotification(message: string) {
        this.dialog.open(ErrorDialogComponent, {
            data: { message },
            width: '400px',
        });
    }

    // NEW WAY (type-safe)
    getColorsVisualizations() {
        this.transformedColorsList = this.detectedEmotions.map(
            (emotionKey: string) => {
                const emotionType = emotionKey as EmotionType;
                const config = EMOTION_COLOR_MAP[emotionType];

                // ✅ Get all ColorVisualization objects (primary + alternates)
                const allColors = [
                    config.primaryColor,
                    ...config.alternateColors,
                ];

                return {
                    emotionName: config.emotionName,
                    emotionType: emotionType,
                    colorOptions: allColors.map((c) => c.colorName), // Color names
                    selectedValue: config.primaryColor.colorName,
                    hexValues: allColors.map((c) => c.hexCode), // Hex codes
                    selectedHex: config.primaryColor.hexCode,
                } as EmotionDropdownOption;
            },
        );
    }

    /*Hardcoded color values - ugly part of code :D*/
    //     getColorsVisualizations() {
    //         // mock ColorEmotion list of objects
    //         this.transformedColorsList = [
    //             {
    //                 emotionName: 'joy',
    //                 colorOptions: ['yellow', 'orange', 'pink'],
    //                 selectedValue: 'yellow',
    //             },
    //             {
    //                 emotionName: 'surprise',
    //                 colorOptions: ['blue', 'purple'],
    //                 selectedValue: 'blue',
    //             },
    //             {
    //                 emotionName: 'fear',
    //                 colorOptions: ['black', 'gray'],
    //                 selectedValue: 'black',
    //             },
    //         ];

    //         // uncomment later for production
    //         // this.textToEmotionService
    //         //     .getColorsVisualizations(this.detectedEmotions)
    //         //     .then((res) => {
    //         //         const messageResponse = res.data.choices[0].message.content;
    //         //         this.detectedColors = messageResponse.match(this.regex)[0];
    //         //         this.detectedColorsReplaced = JSON.parse(this.detectedColors);
    //         //         this.transformedColors = Object.entries(
    //         //             this.detectedColorsReplaced
    //         //         ).map(([emotion, colors]) => ({
    //         //             [emotion]: colors,
    //         //         }));
    //         //         this.transformDetectedColors();
    //         //     });
    //     }

    //     // uncomment later for production + adjust if needed after displaying data in mat card

    //     // transformDetectedColors = () => {
    //     //     this.transformedColorsList = this.transformedColors.map(
    //     //         (emotionObject: { [x: string]: any }) => {
    //     //             const emotionName = Object.keys(emotionObject)[0];
    //     //             const colorValue = emotionObject[emotionName];
    //     //             return {
    //     //                 emotionName,
    //     //                 colorValue,
    //     //             };
    //     //         }
    //     //     );
    //     //     console.log('transformed list', this.transformedColorsList);
    //     //     return this.transformedColorsList;
    //     // };
}
