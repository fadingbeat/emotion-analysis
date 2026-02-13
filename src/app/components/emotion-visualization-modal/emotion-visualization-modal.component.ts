import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EmotionType, VisualizationShape } from 'src/app/core/models/emotions';
import { EMOTION_COLOR_MAP } from 'src/app/core/models/types';
import {
    VISUALIZATION_SHAPES,
    ShapeConfig,
} from 'src/app/core/models/mock-data';
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { COLOR_AFFIRMATIONS } from 'src/app/core/models/mock-data';

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

    visualization!: {
        text: string;
        affirmation: string;
        shape: VisualizationShape;
    };
    shapeConfig!: ShapeConfig;
    safeSvg!: SafeHtml;
    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit() {
        const config = EMOTION_COLOR_MAP[this.emotion];
        this.visualization = config.visualization;
        this.visualization.affirmation =
            COLOR_AFFIRMATIONS[this.color] || config.visualization.affirmation;

        this.shapeConfig = VISUALIZATION_SHAPES[config.visualization.shape];
        // Auto-close nakon 60 sekundi
        this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(
            this.shapeConfig.svg,
        );
        setTimeout(() => this.close.emit(), 60000);
    }
}
