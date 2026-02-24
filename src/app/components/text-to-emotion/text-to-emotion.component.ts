import {
    Component,
    Type,
    Injector,
    OnInit,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { TextToEmotionService } from 'src/app/services/text-to-emotion.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
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
    lazyChart: Type<any> | null = null;
    myInjector: Injector | undefined = undefined;

    constructor(
        private textToEmotionService: TextToEmotionService,
        private responsiveService: ResponsiveService,
        public router: Router,
        private dialog: MatDialog,
        private injector: Injector,
    ) {}

    sentence = '';
    filteredEmotions: Record<string, number> = {};
    detectedEmotions: string[] = [];
    transformedColorsList: EmotionDropdownOption[] = [];
    statusLoaded = false;
    ifHandsetPortrait = false;
    ifHandsetLandscape = false;
    ifWeb = false;
    loadingSpinner = false;
    buttonClicked = false;

    // taking values from emotions_normalized object, storing and displaying only value (emotion) with the highest score
    emotionsNormalized!: EmotionsNormalized;

    ngOnInit() {
        this.responsiveService.observeResponsive().subscribe((state) => {
            this.ifHandsetPortrait = state.ifHandsetPortrait;
            this.ifHandsetLandscape = state.ifHandsetLandscape;
            this.ifWeb = state.ifWeb;
        });
    }

    analyzeSentence() {
        this.statusLoaded = false;
        this.emotionsNormalized = {} as EmotionsNormalized;
        this.filteredEmotions = {};
        this.detectedEmotions = [];
        this.transformedColorsList = [];
        this.myInjector = Injector.create({
            providers: [
                {
                    provide: 'CHART_DATA',
                    useValue: {
                        emotions: this.emotionsNormalized,
                        loaded: this.statusLoaded,
                    },
                },
            ],
            parent: this.injector,
        });
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

            if (!this.lazyChart) {
                import('./emotional-status/emotional-status.component').then(
                    (m) => {
                        // Create a custom injector that provides the data
                        this.myInjector = Injector.create({
                            providers: [
                                {
                                    provide: 'CHART_DATA',
                                    useValue: {
                                        emotions: this.emotionsNormalized || [],
                                        loaded: this.statusLoaded,
                                    },
                                },
                            ],
                            parent: this.injector,
                        });

                        this.lazyChart = m.EmotionalStatusComponent;
                        this.buttonClicked = true;
                    },
                );
            } else {
                this.buttonClicked = true;
            }

            // this.buttonClicked = true;
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
}
