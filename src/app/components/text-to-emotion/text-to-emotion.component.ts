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
    emotionsDetectedArray: [] = [];
    emotionScores: number[] = [];
    detectedEmotionScores: {};
    emotionsAndScoresList: any = [];
    emotionDescription: '';
    statusLoaded = false;
    colorComponentLoaded = false;
    ifHandsetPortrait = false;
    ifHandsetLandscape = false;
    ifWeb = false;
    uuid = '';
    loadingSpinner = false;

    // taking values from emotions_normalized object, storing and displaying only value (emotion) with the highest score
    emotionsNormalized: any;

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
        this.emotionsAndScoresList = [];
        this.loadingSpinner = true;

        /* Mock function and values */

        this.textToEmotionService.getEmotionsMock().subscribe((res) => {
            const emotions = JSON.parse(JSON.stringify(res));
            this.emotionsNormalized = emotions.emotions_normalized;
            this.emotionScores = emotions.emotion_scores;
            this.statusLoaded = true;
            for (const em of [this.emotionsNormalized]) {
                const emotionHighest = Object.keys(
                    this.emotionsNormalized
                ).reduce((emotionPrev, emotionNext) =>
                    this.emotionsNormalized[emotionPrev] >
                    this.emotionsNormalized[emotionNext]
                        ? emotionPrev
                        : emotionNext
                );
                const emoji =
                    emotionHighest === 'sadness'
                        ? this.emojis.sadness
                        : emotionHighest === 'joy'
                        ? this.emojis.joy
                        : emotionHighest === 'fear'
                        ? this.emojis.fear
                        : emotionHighest === 'surprise'
                        ? this.emojis.surprise
                        : emotionHighest === 'disgust'
                        ? this.emojis.disgust
                        : emotionHighest === 'anger'
                        ? this.emojis.anger
                        : this.emojis.neutral;
                this.detectedEmotionScores = {
                    emotion: emotionHighest,
                    score: em[emotionHighest],
                    emoji,
                };
                this.emotionsAndScoresList.push(this.detectedEmotionScores);
                this.loadingSpinner = false;
            }
        });

        // Below code is for server communication
        // this.textToEmotionService.getEmotions(this.sentence).then(
        //     (res) => {
        //         this.emotionsNormalized = res.emotions_normalized;
        //         this.emotionScores = res.emotion_scores;
        //         this.statusLoaded = true;

        //         for (const em of [this.emotionsNormalized]) {
        //             const emotionHighest = Object.keys(
        //                 this.emotionsNormalized
        //             ).reduce((emotionPrev, emotionNext) =>
        //                 this.emotionsNormalized[emotionPrev] >
        //                 this.emotionsNormalized[emotionNext]
        //                     ? emotionPrev
        //                     : emotionNext
        //             );
        //             const emoji =
        //                 emotionHighest === 'sadness'
        //                     ? this.emojis.sadness
        //                     : emotionHighest === 'joy'
        //                     ? this.emojis.joy
        //                     : emotionHighest === 'fear'
        //                     ? this.emojis.fear
        //                     : emotionHighest === 'surprise'
        //                     ? this.emojis.surprise
        //                     : emotionHighest === 'disgust'
        //                     ? this.emojis.disgust
        //                     : emotionHighest === 'anger'
        //                     ? this.emojis.anger
        //                     : this.emojis.neutral;
        //             this.detectedEmotionScores = {
        //                 emotion: emotionHighest,
        //                 score: em[emotionHighest],
        //                 emoji,
        //             };
        //             this.emotionsAndScoresList.push(this.detectedEmotionScores);
        //             this.loadingSpinner = false;

        //             this.textToEmotionService
        //                 .getEmotionDescription(emotionHighest)
        //                 .then((emotionDescription) => {
        //                     this.emotionDescription =
        //                         emotionDescription.data.choices[0].text;
        //                 });
        //         }
        //         this.sentence = '';
        //         this.inputName.nativeElement.value = '';
        //         document.getElementById('emotional-status')?.scrollIntoView({
        //             behavior: 'smooth',
        //             block: 'end',
        //             inline: 'nearest',
        //         });
        //     },
        //     (err) => {
        //         console.log('something went wrong', err);
        //     }
        // );
    }
}
