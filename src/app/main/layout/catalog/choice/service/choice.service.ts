import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {ResponseRestApi} from '../../../../../Shared/model/response';


@Injectable({
    providedIn: 'root'
})
export class ChoiceService {

    private readonly CREATE_CHOICE_LIST = ServiceCommonConstant.adminModuleUrl + '/choiceList/create';
    private readonly GET_CHOICE_LIST = ServiceCommonConstant.adminModuleUrl + '/choiceList/read';
    private readonly GET_CHOICE_LIST_BY_ID = ServiceCommonConstant.adminModuleUrl + '/choiceList/read';
    private readonly UPDATE_CHOICE_LIST = ServiceCommonConstant.adminModuleUrl + '/choiceList/update';
    private readonly DELETE_CHOICE_LIST = ServiceCommonConstant.adminModuleUrl + '/choiceList/delete';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
    }

    getChoiceList(): Observable<any> {
        console.log('Choice.service getForms');
        return this.http.get(this.GET_CHOICE_LIST, this.httpOptions).pipe(map((res: any) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('Choice.service getForms error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }


    getChoiceListById(id): Observable<any> {

        let ret;
        console.log('Choice.service getForms');
        return this.http.get(this.GET_CHOICE_LIST_BY_ID + '/' + id, this.httpOptions).pipe(map((res: any) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            ret = res;
            if (restResponse.isError()) {
                console.log('Choice.service getForms error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return ret.data;
        }));
    }

    createChoice(model): Observable<any> {
        return this.http.post(this.CREATE_CHOICE_LIST, model, this.httpOptions).pipe(
            map(res => {
                const restResponse: ResponseRestApi = new ResponseRestApi(res);
                if (restResponse.isError()) {
                    console.log('ERROR:' + restResponse.error_description);
                    throw new Error(restResponse.error_description);
                }
                return restResponse.data;
            }));

    }

    updateChoice(model): Observable<any> {
        return this.http.put(this.UPDATE_CHOICE_LIST, model, this.httpOptions).pipe(
            map(res => {
                const restResponse: ResponseRestApi = new ResponseRestApi(res);
                if (restResponse.isError()) {
                    console.log('ERROR:' + restResponse.error_description);
                    throw new Error(restResponse.error_description);
                }
                return restResponse.data;
            }));

    }

    deleteCoiceList(id): Observable<any> {
        return this.http.delete(this.DELETE_CHOICE_LIST + '/' + id, this.httpOptions).pipe(
            map(res => {
                const restResponse: ResponseRestApi = new ResponseRestApi(res);
                if (restResponse.isError()) {
                    console.log('ERROR:' + restResponse.error_description);
                    throw new Error(restResponse.error_description);
                }
                return res;
            }));

    }
}
