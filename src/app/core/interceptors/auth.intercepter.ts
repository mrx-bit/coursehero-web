import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');
        let clonedReq;

        if (token) {
            clonedReq = req.clone({
                headers: req.headers.set('x-auth-token', token)
            });
        }

        const handler: Observable<any> = next.handle(token ? clonedReq : req).pipe(shareReplay());

        handler.toPromise().then().catch(event => {
            if (event instanceof HttpErrorResponse && event.status === 401) {
                console.log('Unauthorized request was handled. Logging out: ', event);
                // this.authService.logout();
                // this.router.navigate(['/session/login']);
            }
        });

        return handler;
    }
}
