import {Injectable} from '@angular/core';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResponseRestApi} from '../../../../../Shared/model/response';

@Injectable({
    providedIn: 'root'
})
export class PromoCodeService {
    private readonly PARENT_URL = ServiceCommonConstant.bbookModuleUrl + '/promoCode';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
    }

    generate(bookId, count): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/generate/${bookId}/${count}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('PromoCodeService.service generate error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAllByBook(bookId): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/all/${bookId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('PromoCodeService.service getAllByBook error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }
    downloadReportForm(bookId): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/report/${bookId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('PromoCodeService.service getAllByBook error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

}
