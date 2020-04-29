import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatToolbarModule, MatSelectModule
} from '@angular/material';
import {ToastrModule} from 'ngx-toastr';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {SessionRoutes} from './session.routing';
import {AuthService} from '../service/auth.service';
import {NumberValidator} from 'ng2-validation/dist/number';
import {BilgenUtils} from '../utils/bilgen-utils';
import { MailConfirmComponent } from './mail-confirm/mail-confirm.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        NumberValidator,
        MailConfirmComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatDividerModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule,
        RouterModule.forChild(SessionRoutes),
        ToastrModule.forRoot(),
        SlickCarouselModule,
        MatSelectModule

    ],
    providers: [AuthService, BilgenUtils]
})
export class SessionModule {
}
