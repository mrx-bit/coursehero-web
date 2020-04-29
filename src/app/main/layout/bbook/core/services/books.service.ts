import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResponseRestApi} from '../../../../../Shared/model/response';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class BooksService {

    private readonly GET_ALL_BOOK = ServiceCommonConstant.bbookModuleUrl + '/book';
    private readonly GET_ALL_PAGE = ServiceCommonConstant.bbookModuleUrl + '/page';


    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };


    constructor(private _http: HttpClient) {
    }

    public getAllBooks(): Observable<any> {
        return this._http.get(this.GET_ALL_BOOK + '/all', this.httpOptions).pipe(map(res => {
            return res;
        }));
    }

    public getAllPageByBookId(id): Observable<any> {
        return this._http.get(this.GET_ALL_PAGE + '/all/bookId/' + id, this.httpOptions).pipe(map(res => {
            return res;
        }));
    }

    public getBookByCurrentUser(): Observable<any> {

        console.log('book service token', localStorage.getItem('token'));

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            })
        };

        return this._http.get(this.GET_ALL_BOOK + '/get', httpOptions).pipe(map(res => {
            return res;
        }));
    }


}
