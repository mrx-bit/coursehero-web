import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class Book2Service implements Resolve<any> {

    private readonly PARENT_URL = ServiceCommonConstant.bbookModuleUrl + '/book';

    onBookChanged: BehaviorSubject<any>;
    onStepChanged: BehaviorSubject<number>;


    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
        // Set the defaults
        this.onBookChanged = new BehaviorSubject({});
        this.onStepChanged = new BehaviorSubject(0);
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            console.log('Class: Book2Service, Function: , Line 46 (): ', route.params.step);
            this.onStepChanged.next(route.params.step);
            Promise.all([
                this.getById(route.params.bookId)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }
    getById(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.PARENT_URL}/${id}`, this.httpOptions)
                .subscribe((response: any) => {
                    this.onBookChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

}
