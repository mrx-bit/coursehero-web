import {Injectable} from '@angular/core';
import {ServiceCommonConstant} from '../../../../../core/constants/service-common.constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResponseRestApi} from '../../../../../Shared/model/response';

@Injectable({
    providedIn: 'root'
})
export class JournalService {
    private readonly PARENT_URL = ServiceCommonConstant.bbookModuleUrl + '/journal';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
    }

    getJournalVersionByBookId(id): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/version/${id}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('JournalService.service getJournalVersionByBookId error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }
}
