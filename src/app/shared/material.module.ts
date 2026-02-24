import { TextFieldModule } from '@angular/cdk/text-field';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule,
        MatCardModule,
    ],
    exports: [
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule,
        MatCardModule,
    ],
})
export class MaterialModule {}
