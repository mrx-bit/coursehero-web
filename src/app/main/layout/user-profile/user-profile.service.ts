import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ResponseRestApi} from '../../../Shared/model/response';
import {ServiceCommonConstant} from '../../../core/constants/service-common.constant';

@Injectable({
    providedIn: 'root'
})

export class UserProfileService {

    private readonly PARENT_URL = ServiceCommonConstant.adminModuleUrl + '/users';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };


    constructor(private http: HttpClient) {
    }


    uploadFile(file, userId): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'x-auth-token': localStorage.getItem('token')
            })
        };


        const formData = new FormData();
        formData.append('file', file, file.name);


        return this.http.post(`${this.PARENT_URL}/upload/${userId}`, formData, httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('User-profile.service upload File error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getUser(userId): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/read/${userId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('User-service.service getUser error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }




}

