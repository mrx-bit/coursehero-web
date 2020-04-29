import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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

        if (token !== null) {
            return true;
        }

        console.log('Doesn\'t have a token. Redirecting to login page...');

        this.router.navigate(['/session']);
        return false;


        // this._authService.isTokenExpired().subscribe((res) => {
        //
        //     if (res === false) {
        //         response = true
        //     } else {
        //         console.log('Has a token. Redirecting to dashboard page...');
        //
        //         this.router.navigate(['/session']);
        //     }
        //
        //
        // });

        // return response;

        // const isAuth = localStorage.getItem('token');
        //
        // if (isAuth !== null) {
        //     return true;
        // }
        //
        // console.log('Has a token. Redirecting to dashboard page...');
        //
        // this.router.navigate(['/session']);
        // return false;
    }
}
