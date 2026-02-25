// import {
//     Component,
//     Input,
//     Inject,
//     OnInit,
//     OnChanges,
//     SimpleChanges,
//     ViewChild,
// } from '@angular/core';
// import { Chart, ChartData, ChartEvent } from 'chart.js';
// import pattern from 'patternomaly';
// import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

// import {
//     EmotionsNormalized,
//     getChartColors,
//     CHART_LABELS,
// } from 'src/app/core/models/types';
// import { CommonModule } from '@angular/common';
// import { MaterialModule } from 'src/app/shared/material.module';

// @Component({
//     selector: 'app-emotional-status',
//     standalone: true,
//     imports: [CommonModule, MaterialModule, NgChartsModule],
//     templateUrl: './emotional-status.component.html',
//     styleUrls: ['./emotional-status.component.scss'],
// })
// export class EmotionalStatusComponent implements OnInit {
//     constructor(@Inject('CHART_DATA') public data: any) {}
//     @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
//     @Input() emotionsNormalized: EmotionsNormalized;
//     @Input() statusLoaded!: boolean;
//     public polarChartOptions = { aspectRatio: 2.5 };
//     public polarChartData: ChartData<'polarArea'>;
//     buttonClicked = false;

//     // ✅ Get colors from unified source
//     chartColors = getChartColors();

//     colorBlindnessChart = [
//         pattern.draw('square', 'rgb(252, 15, 3)'),
//         pattern.draw('ring', 'rgb(75, 192, 192)'),
//         pattern.draw('diamond', 'rgb(201, 203, 207)'),
//         pattern.draw('triangle', 'rgb(255, 205, 86)'),
//         pattern.draw('zigzag-vertical', 'rgb(54, 162, 235)'),
//         pattern.draw('diagonal-right-left', 'rgb(255, 99, 132)'),
//     ];

//     isColorBlindMode = false;

//     ngOnInit() {
//         this.displayEmotionChart();
//     }

//     ngOnChanges(changes: SimpleChanges) {
//         if (changes['emotionsNormalized'] && this.statusLoaded) {
//             this.displayEmotionChart(); // Pozovi kada se emotionsNormalized promijeni
//         }
//     }

//     toggleColorblindMode() {
//         this.isColorBlindMode = !this.isColorBlindMode;

//         if (this.isColorBlindMode) {
//             this.polarChartData.datasets[0].backgroundColor =
//                 this.colorBlindnessChart;
//         } else {
//             this.polarChartData.datasets[0].backgroundColor = this.chartColors;
//         }

//         this.chart?.update();
//     }

//     displayEmotionChart() {
//         this.polarChartData = {
//             labels: CHART_LABELS,
//             datasets: [
//                 {
//                     label: 'Score',
//                     data: [
//                         this.emotionsNormalized.anger,
//                         this.emotionsNormalized.disgust,
//                         this.emotionsNormalized.fear,
//                         this.emotionsNormalized.joy,
//                         this.emotionsNormalized.sadness,
//                         this.emotionsNormalized.surprise,
//                     ],
//                     backgroundColor: this.chartColors,
//                 },
//             ],
//         };
//     }
// }

import {
    Component,
    Input,
    Inject,
    OnInit,
    ViewChild,
    SimpleChanges,
    OnDestroy,
} from '@angular/core';
import { ChartData } from 'chart.js';
import pattern from 'patternomaly';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

import {
    EmotionsNormalized,
    getChartColors,
    CHART_LABELS,
} from 'src/app/core/models/types';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-emotional-status',
    standalone: true,
    imports: [CommonModule, MaterialModule, NgChartsModule],
    templateUrl: './emotional-status.component.html',
    styleUrls: ['./emotional-status.component.scss'],
})
export class EmotionalStatusComponent implements OnInit, OnDestroy {
    private dataSub: Subscription;
    // 1. Inject the data from the parent
    constructor(@Inject('CHART_DATA') public data$: Observable<any>) {}

    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    // Keep these so your template doesn't break, but we'll populate them manually
    _emotionsNormalized!: EmotionsNormalized;
    statusLoaded!: boolean;

    public polarChartOptions = { aspectRatio: 2.5 };
    public polarChartData!: ChartData<'polarArea'>;

    chartColors = getChartColors();

    colorBlindnessChart = [
        pattern.draw('square', 'rgb(252, 15, 3)'),
        pattern.draw('ring', 'rgb(75, 192, 192)'),
        pattern.draw('diamond', 'rgb(201, 203, 207)'),
        pattern.draw('triangle', 'rgb(255, 205, 86)'),
        pattern.draw('zigzag-vertical', 'rgb(54, 162, 235)'),
        pattern.draw('diagonal-right-left', 'rgb(255, 99, 132)'),
    ];

    isColorBlindMode = false;

    // It will run every time you map the data in ngOnInit or if you manually update it
    set emotionsNormalized(value: EmotionsNormalized) {
        this._emotionsNormalized = value;
        if (value) {
            this.displayEmotionChart();
        }
    }

    get emotionsNormalized(): EmotionsNormalized {
        return this._emotionsNormalized;
    }

    ngOnInit() {
        // 2. MAP THE INJECTED DATA HERE
        // if (this.injectedData) {
        //     this._emotionsNormalized = this.injectedData.emotions;
        //     this.statusLoaded = this.injectedData.loaded;

        //     // 3. Trigger the chart generation now that variables are set
        //     if (this._emotionsNormalized) {
        //         this.displayEmotionChart();
        //     }
        // }

        this.dataSub = this.data$.subscribe((newData) => {
            if (newData) {
                this.emotionsNormalized = newData.emotions;
                this.statusLoaded = newData.loaded;

                this.displayEmotionChart();
                this.chart?.update(); // Refresh the visual
            }
        });
    }

    // Note: ngOnChanges is removed because we are no longer using [inputs] in HTML

    toggleColorblindMode() {
        this.isColorBlindMode = !this.isColorBlindMode;

        if (this.isColorBlindMode) {
            this.polarChartData.datasets[0].backgroundColor =
                this.colorBlindnessChart;
        } else {
            this.polarChartData.datasets[0].backgroundColor = this.chartColors;
        }

        this.chart?.update();
    }

    displayEmotionChart() {
        // Safety check to prevent "cannot read anger of undefined"
        if (!this._emotionsNormalized) return;

        this.polarChartData = {
            labels: CHART_LABELS,
            datasets: [
                {
                    label: 'Score',
                    data: [
                        this._emotionsNormalized.anger,
                        this._emotionsNormalized.disgust,
                        this._emotionsNormalized.fear,
                        this._emotionsNormalized.joy,
                        this._emotionsNormalized.sadness,
                        this._emotionsNormalized.surprise,
                    ],
                    backgroundColor: this.chartColors,
                },
            ],
        };
    }

    ngOnDestroy() {
        this.dataSub?.unsubscribe();
    }
}
