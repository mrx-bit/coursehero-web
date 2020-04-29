import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {BaseService} from './base.service';
import {ServiceCommonConstant} from '../core/constant/service-common.constant';
import {ResponseRestApi} from '../Shared/model/response';
import {CheckBilgenSessionResponseModel} from '../core/model/alippe/check-bilgen-session-response.model';
import {LoginModel} from '../core/model/alippe/login.model';

export class SessionDetails {
    user: any;
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {

    private readonly BASE_URL = ServiceCommonConstant.baseUrl + '/auth';
    private readonly ADMIN_URL = ServiceCommonConstant.adminModuleUrl;

    constructor(http: HttpClient, private router: Router) {
        super(http, null, 'AuthService');
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.BASE_URL}/login/`, {username, password}).pipe(
            map(response => this.processData(response, 'login')));
    }

    register(registerForm: any): Observable<any> {
        return this.http.post(`${this.BASE_URL}/signup`, registerForm).pipe(
            map(response => this.processData(response, 'register')));
    }

    checkBilgenSession(sessionKey: string): Observable<CheckBilgenSessionResponseModel> {
        return this.http.get<CheckBilgenSessionResponseModel>(`${this.BASE_URL}/signup/checkBilgenSession/${sessionKey}/`).pipe(
            map(response => this.processData(response, 'checkBilgenSession')));
    }

    registerBilgen(data: CheckBilgenSessionResponseModel): Observable<LoginModel> {
        return this.http.post<LoginModel>(`${this.BASE_URL}/signup/bilgen/`, data).pipe(
            map(response => this.processData(response, 'registerBilgen')));
    }

    loginBilgen(data: LoginModel): Observable<any> {
        return this.http.post(`${this.BASE_URL}/login/bilgen/`, data).pipe(
            map(response => this.processData(response, 'loginBilgen')));
    }

    resetPassword(userId: string, newPassword: string): Observable<any> {
        return this.http.get(`${this.BASE_URL}/resetPassword/${userId}/${newPassword}/`).pipe(
            map(response => this.processData(response, 'resetPassword')));
    }

    isTokenExpired(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(`${this.BASE_URL}/check/token/expiration/` + token).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);

            if (restResponse.isError()) {
                console.log('isTokenExpired() error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    confirmSignup(token: string): Observable<any> {
        return this.http.get(`${this.BASE_URL}/signup/confirm/${token}/`).pipe(map(res => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);

            if (restResponse.isError()) {
                console.log('auth.service execute confirm signup error code: ' + restResponse.error_description);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    getUserAndToken(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            })
        };
        return this.http.get(`${this.BASE_URL}/currentUserAndToken/`, httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('getUserAndToken() error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    getRoleList(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            })
        };
        return this.http.get(`${this.ADMIN_URL}/role/read`, httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('getRoleList() error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    logout(): void {
        console.log('Loggin out...');

        const token = localStorage.getItem('token');

        if (token) {
            this.http.post(`${this.BASE_URL}/logout/`, {}).subscribe(response => {
            }, error => {
                console.error(error);
            });

            this.resetLocalVariables();
        }

    }

    resetLocalVariables(): void {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('bookId');
        this.router.navigate(['/session']);

    }

    session(): Observable<SessionDetails> {
        return this.http.get(`${this.BASE_URL}/session/`).pipe(
            map(response => this.processData(response, 'getSession'))
        );
    }


    getResourceList2(userId: any, currentUrl: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            })
        };

        return this.http.get(`${this.ADMIN_URL}/resource/byUser/${userId}`, httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('getResourceList() error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            for (let i = 0; i < restResponse.data.length; i++) {

                if (restResponse.data[i] === currentUrl) {
                    return true;
                }
            }
            this.router.navigate(['/dashboard']);
            console.log('Does not have token. Redirecting to login page...');
            return false;
            // return restResponse.data;
        }));
    }
}
