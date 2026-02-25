// src/app/core/services/responsive.service.ts

import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponsiveState {
    ifHandsetPortrait: boolean;
    ifHandsetLandscape: boolean;
    ifWeb: boolean;
}

@Injectable({ providedIn: 'root' })
export class ResponsiveService {
    constructor(private breakpointObserver: BreakpointObserver) {}

    // ✅ Full breakpoints (for 2 components)
    observeResponsive(): Observable<ResponsiveState> {
        return this.breakpointObserver
            .observe([
                Breakpoints.HandsetPortrait,
                Breakpoints.HandsetLandscape,
                Breakpoints.Web,
            ])
            .pipe(
                map((result) => ({
                    ifHandsetPortrait:
                        result.breakpoints[Breakpoints.HandsetPortrait],
                    ifHandsetLandscape:
                        result.breakpoints[Breakpoints.HandsetLandscape],
                    ifWeb: result.breakpoints[Breakpoints.Web],
                })),
            );
    }

    // ✅ Handset portrait only (for 3rd component)
    observeHandsetPortrait(): Observable<boolean> {
        return this.breakpointObserver
            .observe([Breakpoints.HandsetPortrait])
            .pipe(
                map(
                    (result) => result.breakpoints[Breakpoints.HandsetPortrait],
                ),
            );
    }
}
