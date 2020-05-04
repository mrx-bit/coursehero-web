import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../service/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BilgenUtils} from '../../utils/bilgen-utils';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-login-session',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;

    private _unsubscribeAll: Subject<any>;

    constructor(
        public authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        public translate: TranslateService,
        public bilgenUtils: BilgenUtils
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // when email and password is correct, user logged in.
    login(): void {
        this.authService.login(this.email.value, this.password.value).subscribe(res => {
            this.localStorageManagement(res.headers.get('authorization'));
            this.authService.getUserInfo().subscribe(user => {
                localStorage.setItem('user', JSON.stringify(user));

                console.log(user)
                this._router.navigate(['']);
            })
        }, () => {
            this.bilgenUtils.displayMessage('Қате мәлімет еңгіздіңіз!');
        });
    }

    localStorageManagement(token): void {
        localStorage.removeItem('token');
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
    }

    get email(): FormControl {
        return this.loginForm.get('email') as FormControl;
    }

    /**
     * password getter
     */
    get password(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }

}



