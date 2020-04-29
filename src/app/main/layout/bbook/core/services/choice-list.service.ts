import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {ChoiceListConstant} from '../constants/choice-list.constant';
import {ResponseRestApi} from '../../../../../Shared/model/response';


@Injectable()
export class ChoiceListService {

    private readonly PARENT_URL = ServiceCommonConstant.adminModuleUrl + '/choiceList';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
    }

    getCategories(): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/read/byCode/${ChoiceListConstant.CATEGORIES}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ChoiceListService.service getCategories error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getChoice(code): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/read/byCode/${code}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ChoiceListService.service getChoice error code: ' + code + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getChoiceByName(code): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/read/byCode/${code}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ChoiceListService.service getChoice error code: ' + code + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getCities(): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/read/byCode/${ChoiceListConstant.CITIES}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ChoiceListService.service getCities error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getLanguages(): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/read/byCode/${ChoiceListConstant.LANGUAGES}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ChoiceListService.service getLanguages error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

}
