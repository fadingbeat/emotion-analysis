import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TextToEmotionService } from 'src/app/services/text-to-emotion.service';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Emotion, EmotionsNormalized } from 'src/app/core/models/emotion';

@Component({
    selector: 'app-text-to-emotion',
    templateUrl: './text-to-emotion.component.html',
    styleUrls: ['./text-to-emotion.component.scss'],
})
export class TextToEmotionComponent implements OnInit {
    @ViewChild('prompt') inputName: any;

    constructor(
        private textToEmotionService: TextToEmotionService,
        private responsive: BreakpointObserver,
        public router: Router
    ) {}
    sentence = '';
    userInput = '';
    description =
        'The application detects emotions based on given input and provides more info about the emotion and colors associated with it. You will be suggested with a guided visualization to help you deal with your feelings.The analyzer currently works with five emotions. You can either use analyzer for emotion detection, or if you already know what you are feeling, choose the emotion from the dropdown menu. ';
    filteredEmotions: Record<string, number> = {};
    detectedEmotions: string[] = [];
    detectedColors: any;
    detectedColorsReplaced: any;
    transformedColors: any;
    transformedColorsList: any;
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
    emotionsNormalized: any;
    emotionsScoresNormalized: Record<string, any>[] = [];

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
            option.toLowerCase().includes(filterValue)
        );
    }

    ngOnInit() {
        this.filteredPrompts = this.promptControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
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
    }

    analyzeSentence() {
        this.router.navigateByUrl('home');
        this.loadingSpinner = true;

        /* Mock function and values */

        // this.textToEmotionService.getEmotionsMock().subscribe((res) => {
        //     const emotions = JSON.parse(JSON.stringify(res));
        //     this.emotionsNormalized = emotions.emotions_normalized;
        //     this.statusLoaded = true;

        //     for (const key in this.emotionsNormalized) {
        //         if (this.emotionsNormalized[key] > 0) {
        //             this.filteredEmotions[key] = this.emotionsNormalized[key];
        //         }
        //     }

        //     this.detectedEmotions = Object.keys(this.filteredEmotions);
        //     this.loadingSpinner = false;
        //     this.buttonClicked = true;
        //     // this.getColorsVisualizations();
        // });

        // Below code is for server communication + add the logic from mock related to extracting only emotions that have a value greater than 0
        this.textToEmotionService.getEmotions(this.sentence).then(
            (res) => {
                console.log('res', res);
                this.emotionsNormalized = res.emotions_normalized;
                this.statusLoaded = true;

                for (const key in this.emotionsNormalized) {
                    if (this.emotionsNormalized[key] > 0) {
                        this.filteredEmotions[key] =
                            this.emotionsNormalized[key];
                    }
                }

                this.detectedEmotions = Object.keys(this.filteredEmotions);

                this.loadingSpinner = false;
                this.buttonClicked = true;
                // this.getColorsVisualizations();

                this.sentence = '';
                this.inputName.nativeElement.value = '';
                document.getElementById('emotional-status')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest',
                });
            },
            (err) => {
                console.log('something went wrong', err);
            }
        );
    }

    // getColorsVisualizations() {
    //     console.log('detected emotions', this.detectedEmotions);
    //     // mock ColorEmotion list of objects
    //     // this.transformedColorsList = [
    //     //     { emotionName: 'joy', colorValue: ['yellow', 'orange', 'pink'] },
    //     //     { emotionName: 'surprise', colorValue: ['blue', 'purple'] },
    //     //     { emotionName: 'fear', colorValue: ['black', 'gray'] },
    //     // ];

    //     // uncomment later for production
    //     this.textToEmotionService
    //         .getColorsVisualizations(this.detectedEmotions)
    //         .then((res) => {
    //             const messageResponse = res.data.choices[0].message.content;
    //             this.detectedColors = messageResponse.match(this.regex)[0];
    //             this.detectedColorsReplaced = JSON.parse(this.detectedColors);
    //             this.transformedColors = Object.entries(
    //                 this.detectedColorsReplaced
    //             ).map(([emotion, colors]) => ({
    //                 [emotion]: colors,
    //             }));
    //             this.transformDetectedColors();
    //         });
    // }

    // uncomment later for production + adjust if needed after displaying data in mat card

    // transformDetectedColors = () => {
    //     this.transformedColorsList = this.transformedColors.map(
    //         (emotionObject: { [x: string]: any }) => {
    //             const emotionName = Object.keys(emotionObject)[0];
    //             const colorValue = emotionObject[emotionName];
    //             return {
    //                 emotionName,
    //                 colorValue,
    //             };
    //         }
    //     );
    //     console.log('transformed list', this.transformedColorsList);
    //     return this.transformedColorsList;
    // };
}
