import {Injectable} from '@angular/core';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResponseRestApi} from '../../../../../Shared/model/response';

@Injectable({
    providedIn: 'root'
})
export class ApplicationBookService {
    private readonly PARENT_URL = ServiceCommonConstant.bbookModuleUrl + '/applicationBook';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/all`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ApplicationBookService.service getAll error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAllCustom(): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/allCustom`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ApplicationBookService.service getAllCustom error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    create(model: any): Observable<any> {
        return this.http.post(`${this.PARENT_URL}/create`, model, this.httpOptions).pipe(
            map(res => {
                const restResponse: ResponseRestApi = new ResponseRestApi(res);
                if (restResponse.isError()) {
                    console.log('ERROR:' + restResponse.error_description);
                    throw new Error(restResponse.error_description);
                }
                return restResponse.data;
            }));
    }

    update(model: any): Observable<any> {
        return this.http.post(`${this.PARENT_URL}/update`, model, this.httpOptions).pipe(
            map(res => {
                const restResponse: ResponseRestApi = new ResponseRestApi(res);
                if (restResponse.isError()) {
                    console.log('ERROR:' + restResponse.error_description);
                    throw new Error(restResponse.error_description);
                }
                return restResponse.data;
            }));
    }
}
