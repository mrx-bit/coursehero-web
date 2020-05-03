import {Injectable} from '@angular/core';
import {ServiceCommonConstant} from '../../../core/constants/service-common.constant';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChildService {

    private readonly PARENT_URL = ServiceCommonConstant.adminModuleUrl + '/child';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };
}
