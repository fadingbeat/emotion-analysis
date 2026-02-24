import {
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import {
    HEX_TO_COLOR_NAME,
    getColorVisualization,
    isLightColor,
} from 'src/app/core/models/types';
import {
    EmotionDropdownOption,
    EmotionType,
} from 'src/app/core/models/emotions';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
    selector: 'app-color-visualization',
    templateUrl: './color-visualization.component.html',
    styleUrls: ['./color-visualization.component.css'],
})
export class ColorVisualizationComponent
    implements OnInit, AfterViewInit, OnChanges
{
    constructor(private responsiveService: ResponsiveService) {}
    @Input() transformedColorsList!: EmotionDropdownOption[];
    @ViewChildren('selectRef') selectRef: MatSelect;
    loadingSpinner = false;
    tColorList: EmotionDropdownOption[] = [];
    defaultSelectColorList: EmotionDropdownOption[] = [];
    selectedColor: string = 'white';
    ifHandsetPortrait = false;
    ifHandsetLandscape = false;
    ifWeb = false;
    isLightColor = isLightColor;

    ngOnInit() {
        this.loadingSpinner = true;
        this.responsiveService.observeResponsive().subscribe((state) => {
            this.ifHandsetPortrait = state.ifHandsetPortrait;
            this.ifHandsetLandscape = state.ifHandsetLandscape;
            this.ifWeb = state.ifWeb;
        });
    }

    ngAfterViewInit() {
        if (this.transformedColorsList) {
            this.loadingSpinner = false;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['transformedColorsList'])
            this.tColorList = changes.transformedColorsList.currentValue;
        if (this.tColorList) {
            this.defaultSelectColorList = this.tColorList;
        }
    }

    onColorChange(selectedColor: string, cardIndex: number) {
        const hexCode = Object.entries(HEX_TO_COLOR_NAME).find(
            ([_, name]) => name === selectedColor,
        )?.[0];

        if (hexCode) {
            this.tColorList[cardIndex].selectedValue = selectedColor;
            this.tColorList[cardIndex].selectedHex = hexCode;
        }
    }

    getColorDescription(hexCode: string): string {
        const colorViz = getColorVisualization(hexCode);
        return colorViz?.description || '';
    }

    showVisualizationModal = false;
    selectedEmotionForModal!: EmotionType;
    selectedColorForModal!: string;

    openVisualizationModal(emotion: string, hexColor: string) {
        const emotionType = emotion as EmotionType;
        this.selectedEmotionForModal = emotionType;
        this.selectedColorForModal = hexColor;
        this.showVisualizationModal = true;
    }

    closeVisualizationModal() {
        this.showVisualizationModal = false;
    }
}
