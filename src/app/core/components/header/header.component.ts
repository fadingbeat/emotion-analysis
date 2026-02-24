import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    ifHandsetPortrait = false;
    constructor(private responsiveService: ResponsiveService) {}

    ngOnInit() {
        this.responsiveService.observeResponsive().subscribe((state) => {
            this.ifHandsetPortrait = state.ifHandsetPortrait;
        });
    }
}
