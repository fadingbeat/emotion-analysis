import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';

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
    ifHandsetPortrait = false;
    ifHandsetLandscape = false;
    ifWeb = false;
    loadingSpinner = false;
    defaultSelectColorList = [];
    tColorList: any;
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
        console.log(changes.transformedColorsList);
        this.tColorList = changes.transformedColorsList.currentValue;
        if (this.tColorList) {
            for (const c of this.tColorList) {
                console.log(c.colorValue);
            }
            this.defaultSelectColorList = this.tColorList;
            console.log('default list', this.defaultSelectColorList);
        }
    }
}
