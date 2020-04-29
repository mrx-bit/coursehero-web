import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogRoutingModule} from './catalog-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '../layout.module';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule, MatIconModule,
    MatInputModule, MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import {FuseConfirmDialogModule, FuseSidebarModule} from '../../../../@fuse/components';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {ChoiceService} from './choice/service/choice.service';
import {AuthInterceptor} from '../../../core/interceptors/auth.intercepter';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ChoiceValueAddEditComponent} from './choice/choice-add-edit/choice-value-add-edit/choice-value-add-edit.component';
import {ChoiceComponent} from './choice/choice.component';
import {ChoiceAddEditComponent} from './choice/choice-add-edit/choice-add-edit.component';

@NgModule({
    declarations: [ChoiceComponent, ChoiceAddEditComponent, ChoiceValueAddEditComponent],
    imports: [CommonModule, CatalogRoutingModule,
        FormsModule, LayoutModule, MatInputModule,
        MatDatepickerModule, MatRadioModule,
        MatCheckboxModule, MatButtonModule, MatIconModule,
        ReactiveFormsModule, MatProgressSpinnerModule, MatDialogModule,
        MatGridListModule, MatTableModule, MatSnackBarModule,
        MatTabsModule, MatToolbarModule,
        FuseSharedModule, MatPaginatorModule,
        FuseConfirmDialogModule,
        FuseSidebarModule, MatDividerModule,
    ], providers: [
        ChoiceService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
    exports: [
        ChoiceValueAddEditComponent
    ],
    entryComponents: [
        ChoiceValueAddEditComponent
    ]
})
export class CatalogModule {
}
