import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
    EmotionType,
    VisualizationShape,
    ColorVisualization,
} from 'src/app/core/models/emotions';
import {
    EMOTION_COLOR_MAP,
    getColorVisualization,
} from 'src/app/core/models/types';
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';

@Component({
    selector: 'app-emotion-visualization-modal',
    templateUrl: './emotion-visualization-modal.component.html',
    styles: [],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-in', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('300ms ease-out', style({ opacity: 0 })),
            ]),
        ]),
        trigger('slideUp', [
            transition(':enter', [
                style({ transform: 'translateY(50px)', opacity: 0 }),
                animate(
                    '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                    style({ transform: 'translateY(0)', opacity: 1 }),
                ),
            ]),
            transition(':leave', [
                animate(
                    '300ms ease-in',
                    style({ transform: 'translateY(50px)', opacity: 0 }),
                ),
            ]),
        ]),
    ],
})
export class EmotionVisualizationModalComponent implements OnInit {
    @Input() emotion!: EmotionType;
    @Input() color!: string;
    @Output() close = new EventEmitter<void>();

    visualization!: ColorVisualization['visualization'];
    colorName!: string;

    ngOnInit() {
        const colorViz = getColorVisualization(this.color);

        if (colorViz) {
            this.visualization = colorViz.visualization;
            this.colorName = colorViz.colorName;
        }

        setTimeout(() => this.close.emit(), 60000);
    }
}
