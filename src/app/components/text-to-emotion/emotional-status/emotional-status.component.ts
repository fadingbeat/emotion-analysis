import {
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { Chart, ChartData, ChartEvent } from 'chart.js';
import { draw, generate } from 'patternomaly';
import pattern from 'patternomaly';
import { BaseChartDirective } from 'ng2-charts';
// import { EmotionsNormalized } from 'src/app/core/models/emotions';
import {
    EmotionsNormalized,
    getChartColors,
    CHART_LABELS,
} from 'src/app/core/models/types';

@Component({
    selector: 'app-emotional-status',
    templateUrl: './emotional-status.component.html',
    styleUrls: ['./emotional-status.component.scss'],
})
export class EmotionalStatusComponent implements OnInit {
    constructor() {}
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
    @Input() emotionsNormalized: EmotionsNormalized;
    @Input() statusLoaded!: boolean;
    public polarChartOptions = { aspectRatio: 2.5 };
    public polarChartData: ChartData<'polarArea'>;
    buttonClicked = false;

    // chartConfig: ChartConfiguration;
    // isColorblindMode = false;

    // ✅ Get colors from unified source
    chartColors = getChartColors();

    colorBlindnessChart = [
        pattern.draw('square', 'rgb(252, 15, 3)'),
        pattern.draw('ring', 'rgb(75, 192, 192)'),
        pattern.draw('diamond', 'rgb(201, 203, 207)'),
        pattern.draw('triangle', 'rgb(255, 205, 86)'),
        pattern.draw('zigzag-vertical', 'rgb(54, 162, 235)'),
        pattern.draw('diagonal-right-left', 'rgb(255, 99, 132)'),
    ];

    ngOnInit() {
        this.displayEmotionChart();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['emotionsNormalized'] && this.statusLoaded) {
            this.displayEmotionChart(); // Pozovi kada se emotionsNormalized promijeni
        }
    }

    updateChartToColorBlindness() {
        this.polarChartData.datasets[0].backgroundColor =
            this.colorBlindnessChart;
        this.chart?.update();
    }

    displayEmotionChart() {
        this.polarChartData = {
            labels: CHART_LABELS,
            datasets: [
                {
                    label: 'Score',
                    data: [
                        this.emotionsNormalized.anger,
                        this.emotionsNormalized.disgust,
                        this.emotionsNormalized.fear,
                        this.emotionsNormalized.joy,
                        this.emotionsNormalized.sadness,
                        this.emotionsNormalized.surprise,
                    ],
                    backgroundColor: this.chartColors,
                },
            ],
        };
    }
}
