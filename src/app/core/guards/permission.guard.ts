import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../service/auth.service';


@Injectable({
    providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

    user: any;

    constructor(private _service: AuthService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.user = JSON.parse(localStorage.getItem('user'));
        return this._service.getResourceList2(this.user.id, state.url);
    }

}
