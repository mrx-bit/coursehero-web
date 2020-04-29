import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../core/model/alippe/user';
import {UserTypeConstant} from '../../core/model/alippe/userTypeConstant';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BilgenUtils} from '../../utils/bilgen-utils';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-register-session',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class RegisterComponent implements OnInit {
    user: User;
    registerForm: FormGroup;
    userTypes: UserTypeConstant = new UserTypeConstant();

    showError = false;
    errorMessage: any;

    constructor(
        public _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        public translate: TranslateService,
        private _bilgenUtils: BilgenUtils
    ) {
    }

    register() {
        this.showError = false;
        this._authService.register(this.registerForm.getRawValue()).subscribe(response => {
            this._router.navigate(['/session/login']);
        }, (error) => {
            this._bilgenUtils.displayMessage(error);
        });
    }

    ngOnInit(): void {
        console.log(this.userTypes);
        this.registerForm = this.initForm();
    }


    initForm(): any {
        return this.registerForm = this._formBuilder.group({
            idn: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            email: ['', Validators.required],
            userType: [this.userTypes.IS_TEACHER.key],
            password: ['', [Validators.required]],
            mobilePhone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

    }

}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return {'passwordsNotMatching': true};
};


