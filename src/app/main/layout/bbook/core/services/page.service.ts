import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {ResponseRestApi} from '../../../../../Shared/model/response';


@Injectable()
export class PageService {

    private readonly PARENT_URL = ServiceCommonConstant.bbookModuleUrl + '/page';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
    }

    /*
    * 1
    * */
    getAll(): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/all`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('PageService.service getAll error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    /*
    * 2
    * */
    getAllByState(state): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/all/state/${state}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('PageService.service getAllByState error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    /*
    * 2.1 get links by book id
    * */
    getAllByBookId(bookId): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/all/bookId/${bookId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('LinkService.service getAllByBookId error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    /*
    * 2.2 get links by book id
    * */
    getPage(params?: string): Observable<any> {
        if (!params) {
            params = '';
        }

        // this.GET_USERS + '?' + params
        return this.http.get(`${this.PARENT_URL}/read?${params}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('LinkService.service getLink error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    getPagesWithStr(str, bookId): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/search` + '?bookId=' + bookId + '&searchString=' + str, this.httpOptions)
            .pipe(map((res) => {
                const restResponse: ResponseRestApi = new ResponseRestApi(res);
                if (restResponse.isError()) {
                    console.log('LinkService.service getLinksWithStr error code: ' + restResponse.error_code);
                    throw new Error(restResponse.error_description);
                }

                return restResponse.data;
            }));
    }

    /*
    * 3
    * */
    getById(id): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/${id}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('PageService.service getById error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    /*
    * 4
    * */
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
    /*
    * 5
    * */
    update(model: any): Observable<any> {
        return this.http.put(`${this.PARENT_URL}/update`, model, this.httpOptions).pipe(
            map(res => {
                const restResponse: ResponseRestApi = new ResponseRestApi(res);
                if (restResponse.isError()) {
                    console.log('ERROR:' + restResponse.error_description);
                    throw new Error(restResponse.error_description);
                }
                return restResponse.data;
            }));
    }

    /*
    * 6
    * */
    delete(deleteId): Observable<any> {
        return this.http.delete(`${this.PARENT_URL}/delete/${deleteId}`, this.httpOptions).pipe(
            map(res => {
                const restResponse: ResponseRestApi = new ResponseRestApi(res);
                if (restResponse.isError()) {
                    console.log('PageService.service delete error code: ' + restResponse.error_code);
                    throw new Error(restResponse.error_description);
                }
                return restResponse.data;
            }));
    }

    /*
    * 7
    * */
    disable(disableId): Observable<any> {
        return this.http.delete(`${this.PARENT_URL}/disable/${disableId}`, this.httpOptions).pipe(
            map(res => {
                const restResponse: ResponseRestApi = new ResponseRestApi(res);
                if (restResponse.isError()) {
                    console.log('PageService.service disable error code: ' + restResponse.error_code);
                    throw new Error(restResponse.error_description);
                }
                return restResponse.data;
            }));
    }
}
