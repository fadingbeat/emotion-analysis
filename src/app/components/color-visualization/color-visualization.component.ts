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

@Component({
    selector: 'app-color-visualization',
    templateUrl: './color-visualization.component.html',
    styleUrls: ['./color-visualization.component.css'],
})
export class ColorVisualizationComponent
    implements OnInit, AfterViewInit, OnChanges
{
    constructor(private responsive: BreakpointObserver) {}
    @Input() transformedColorsList: any;
    @ViewChildren('selectRef') selectRef: MatSelect;
    ifHandsetPortrait = false;
    ifHandsetLandscape = false;
    ifWeb = false;
    loadingSpinner = false;
    defaultSelectColorList = [];
    tColorList: any;
    card: any;
    activeMatCardEl: any;
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
        this.tColorList = changes.transformedColorsList.currentValue;
        if (this.tColorList) {
            for (const c of this.tColorList) {
            }
            this.defaultSelectColorList = this.tColorList;
        }
    }

    onColorChange(selectedColor: string, cardIndex: number) {
        this.tColorList[cardIndex].selectedColor = selectedColor;
    }
}
