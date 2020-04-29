import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-mail-confirm',
    templateUrl: './mail-confirm.component.html',
    styleUrls: ['./mail-confirm.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MailConfirmComponent implements OnInit, OnDestroy {

    showError = false;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params  => {
            const token = params['token'];
            if (typeof token !== 'undefined' && token !== null) {
                this.confirmSignupViaToken(token);
            }
        });
    }

    ngOnDestroy() {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    confirmSignupViaToken(token: string) {
        this._authService.confirmSignup(token).subscribe(res => {
            console.log('Email has been successfully confirmed');
            setTimeout(() => {
                this.router.navigate(['/session/login']);
            }, 5000);
        }, error => {
            this.showError = true;
            console.log(error);
        });
    }

}
