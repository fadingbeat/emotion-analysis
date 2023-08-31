import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextToEmotionComponent } from './components/text-to-emotion/text-to-emotion.component';
import { TextToEmotionService } from './services/text-to-emotion.service';
import { EmotionalStatusComponent } from './components/text-to-emotion/emotional-status/emotional-status.component';
import { ErrorDialogComponent } from './core/error-handling/error-dialog/error-dialog.component';
import { ErrorDialogService } from './core/error-handling/error-dialog.service';
import { GlobalErrorHandler } from './core/error-handling/global-error-handler';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        AppComponent,
        TextToEmotionComponent,
        EmotionalStatusComponent,
        ErrorDialogComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NgChartsModule,
    ],

    providers: [
        ErrorDialogService,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler,
        },
        TextToEmotionService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
