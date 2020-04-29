import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private _authService: AuthService
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // let response = false;

        console.log('token', localStorage.getItem('token'));

        const token = localStorage.getItem('token');

        if (token === null) {
            return true;
        }

        console.log('Has a token. Redirecting to dashboard page...');

        this.router.navigate(['/session']);
        return false;

        // this._authService.isTokenExpired().subscribe((res) => {
        //
        //     console.log('res', res);
        //
        //     if (res === true) {
        //         response = true;
        //     } else {
        //         console.log('Has a token. Redirecting to dashboard page...');
        //
        //         this.router.navigate(['/dashboard/crm']);
        //         response = false;
        //     }
        //
        //
        // });
        // console.log('response', response);
        //
        // return response;

        // next: ActivatedRouteSnapshot,
        // state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        //
        // const isAuth = localStorage.getItem('token');
        //
        // if (isAuth == null) {
        //     return true;
        // }
        //
        // console.log('Has a token. Redirecting to dashboard page...');
        //
        // this.router.navigate(['/dashboard/crm']);
        // return false;
    }
}
