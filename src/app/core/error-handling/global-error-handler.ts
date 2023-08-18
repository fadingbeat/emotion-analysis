import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorDialogService } from './error-dialog.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private errorDialogService: ErrorDialogService,
        private zone: NgZone,
        private router: Router
    ) {}
    typeErrorMsg = 'Please, try again.';
    handleError(error: any) {
        this.zone.run(() => {
            this.errorDialogService.openDialog(error),
                this.router.navigateByUrl('/');
        });
    }
}
