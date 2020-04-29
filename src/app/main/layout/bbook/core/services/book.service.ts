import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ChoiceListConstant} from '../constants/choice-list.constant';
import {StateConstant} from '../constants/state.constant';
import {ResponseRestApi} from '../../../../../Shared/model/response';


@Injectable()
export class BookService implements Resolve<any> {

    private readonly PARENT_URL = ServiceCommonConstant.bbookModuleUrl + '/book';
    private readonly CHOISE_LIST_URL = ServiceCommonConstant.adminModuleUrl + '/choiceList';

    onCategoriesChanged: BehaviorSubject<any>;
    onBooksChanged: BehaviorSubject<any>;


    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
        // Set the defaults
        this.onCategoriesChanged = new BehaviorSubject({});
        this.onBooksChanged = new BehaviorSubject({});
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

            Promise.all([
                this.getCategories(),
                this.getAllByState(StateConstant.ACTIVE)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /*
    * 1
    * */
    // getAll(): Observable<any> {
    //     return this.http.get(`${this.PARENT_URL}/all`, this.httpOptions).pipe(map((res) => {
    //         const restResponse: ResponseRestApi = new ResponseRestApi(res);
    //         if (restResponse.isError()) {
    //             console.log('BookService.service getAll error code: ' + restResponse.error_code);
    //             throw new Error(restResponse.error_description);
    //         }
    //         return restResponse.data;
    //     }));
    // }
    getAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.PARENT_URL}/all`, this.httpOptions)
                .subscribe((response: any) => {
                    this.onBooksChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    getCategories(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.CHOISE_LIST_URL}/read/byCode/${ChoiceListConstant.CATEGORIES}`, this.httpOptions)
                .subscribe((response: any) => {
                    this.onCategoriesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    /*
    * 2
    * */
    // getAllByState(state): Observable<any> {
    //     return this.http.get(`${this.PARENT_URL}/all/state/${state}`, this.httpOptions).pipe(map((res) => {
    //         const restResponse: ResponseRestApi = new ResponseRestApi(res);
    //         if (restResponse.isError()) {
    //             console.log('BookService.service getAllByState error code: ' + restResponse.error_code);
    //             throw new Error(restResponse.error_description);
    //         }
    //         return restResponse.data;
    //     }));
    // }
    getAllByState(state): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.PARENT_URL}/all/state/${state}`, this.httpOptions)
                .subscribe((response: any) => {
                    this.onBooksChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    /*
    * 3
    * */
    getById(id): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/${id}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('BookService.service getById error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }
    updateVersion(id): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/updateVersion/${id}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('BookService.service updateVersion error code: ' + restResponse.error_code);
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
                    console.log('BookService.service delete error code: ' + restResponse.error_code);
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
                    console.log('BookService.service disable error code: ' + restResponse.error_code);
                    throw new Error(restResponse.error_description);
                }
                return restResponse.data;
            }));
    }
}
