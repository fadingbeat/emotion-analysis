import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
import { HEX_TO_COLOR_NAME } from 'src/app/core/models/types';
import { EmotionDropdownOption } from 'src/app/core/models/emotions';

@Component({
    selector: 'app-color-visualization',
    templateUrl: './color-visualization.component.html',
    styleUrls: ['./color-visualization.component.css'],
})
export class ColorVisualizationComponent
    implements OnInit, AfterViewInit, OnChanges
{
    constructor(private responsive: BreakpointObserver) {}
    @Input() transformedColorsList!: EmotionDropdownOption[];
    @ViewChildren('selectRef') selectRef: MatSelect;
    ifHandsetPortrait = false;
    ifHandsetLandscape = false;
    ifWeb = false;
    loadingSpinner = false;
    // defaultSelectColorList = [];
    // tColorList: any;
    tColorList: EmotionDropdownOption[] = [];
    defaultSelectColorList: EmotionDropdownOption[] = [];

    selectedColor: string = 'white';
    ngOnInit() {
        this.loadingSpinner = true;
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
}
