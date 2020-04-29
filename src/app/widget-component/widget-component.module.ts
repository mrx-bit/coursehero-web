import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatCardModule, MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule,
    MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {LanguageDropDownComponent} from './global/language-drop-down/language-drop-down.component';
import { MenuComponent } from './menu/menu.component';
import {BBookModule} from '../main/layout/bbook/bbook.module';

@NgModule({
    declarations: [
        LanguageDropDownComponent,
        MenuComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatCardModule,
        FlexLayoutModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatMenuModule,
        MatDividerModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        TranslateModule,
        MatChipsModule,
        MatToolbarModule,
        MatListModule,
        PerfectScrollbarModule,
        MatTableModule
    ],
    exports: [
        LanguageDropDownComponent,
        MenuComponent
    ]
})

export class WidgetComponentModule { }
