import {Injectable} from '@angular/core';
import {ServiceCommonConstant} from '../../../../../core/constants/service-common.constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResponseRestApi} from '../../../../../Shared/model/response';

@Injectable({
    providedIn: 'root'
})
export class ContentService {
    private readonly PARENT_URL = ServiceCommonConstant.bbookModuleUrl + '/content';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        console.log('----------2------------------------------------------------');

        return this.http.get(`${this.PARENT_URL}/all`, this.httpOptions).pipe(map((res) => {
            console.log('------------------------------------3----------------------');

            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ContentService.service getAll error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }


    getAllById(id): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/allById/${id}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ContentService.service allById error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAllByBook(bookId): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/allByBook/${bookId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ContentService.service allByBook error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }
    getAllByBookParent(bookId): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/allByIdAndParents/${bookId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ContentService.service getAllByBookParent error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }


    getTreeByBookId(bookId): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/allTreeByBook/${bookId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ContentService.service allByBook error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }


    create(model): Observable<any> {
        return this.http.post(`${this.PARENT_URL}/create`, model, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ContentService.service create error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    update(model): Observable<any> {
        return this.http.post(`${this.PARENT_URL}/update`, model, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            console.log('-------------------1---------------------------------------');

            if (restResponse.isError()) {
                console.log('ContentService.service update error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }
    delete(id): Observable<any> {
        return this.http.delete(`${this.PARENT_URL}/delete/${id}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            console.log('-------------------5---------------------------------------');

            if (restResponse.isError()) {
                console.log('ContentService.service delete error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }
    active(id): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/active/${id}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            console.log('-------------------1---------------------------------------');

            if (restResponse.isError()) {
                console.log('ContentService.service active error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

}
