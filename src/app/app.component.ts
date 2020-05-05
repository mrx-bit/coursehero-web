import {Component, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './service/auth.service';
import {Router} from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'gene-app',
    template: `
        <router-outlet></router-outlet>
        <ngx-loading-bar></ngx-loading-bar>`,
    encapsulation: ViewEncapsulation.None
})

export class GeneAppComponent {
    constructor(
        translate: TranslateService,
        private _router: Router,
        private _authService: AuthService
    ) {
        translate.addLangs(['en', 'fr', 'he', 'ru', 'ar', 'zh', 'de', 'es', 'ja', 'ko', 'it', 'hu', 'kz']);
        translate.setDefaultLang('ru');


        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/ru/) ? browserLang : 'ru');

        const token = localStorage.getItem('token');

        console.log('token', token);


        if (token !== null) {
            this._authService.isTokenExpired().subscribe((res) => {

                console.log('res', res);

                if (res === true) {
                    localStorage.removeItem('token');
                    this._router.navigateByUrl('/session');
                }

            });
        }

    }

}
