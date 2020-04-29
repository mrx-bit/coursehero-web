import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResponseRestApi} from '../../../../../Shared/model/response';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly TEACHER = ServiceCommonConstant.adminModuleUrl + '/teacher';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
    }
    getById(id): Observable<any> {
        return this.http.get(`${this.TEACHER}/${id}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('UserService.service getById error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }
}
