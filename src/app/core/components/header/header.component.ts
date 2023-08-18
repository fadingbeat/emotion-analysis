import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    ifHandsetPortrait = false;
    constructor(private responsive: BreakpointObserver) {}

    ngOnInit() {
        this.responsive
            .observe([Breakpoints.HandsetPortrait])
            .subscribe((result) => {
                this.ifHandsetPortrait = false;
                const breakpoints = result.breakpoints;
                if (breakpoints[Breakpoints.HandsetPortrait]) {
                    this.ifHandsetPortrait = true;
                }
            });
    }
}
