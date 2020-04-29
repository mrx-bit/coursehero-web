import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/operator/map';

// For set token to header for <img src...
@Pipe({
    name: 'secure'
})
export class SecurePipe implements PipeTransform {
    httpOptions = {
        headers: new HttpHeaders({
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient,
                private sanitizer: DomSanitizer) {
    }


    transform(url): Observable<SafeUrl> {
        return this.http
            .get(url, {headers: new HttpHeaders({
                    'x-auth-token': localStorage.getItem('token')
                }), responseType: 'blob'})
            .map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)));
    }
}
