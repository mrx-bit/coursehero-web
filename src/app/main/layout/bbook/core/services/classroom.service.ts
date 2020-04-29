import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {ResponseRestApi} from '../../../../../Shared/model/response';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class ClassroomService {

    private readonly PARENT_URL = ServiceCommonConstant.bbookModuleUrl + '/classroom';

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


    /*
    * 2
    * */
    getAllByState(state): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/all/state/${state}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ClassroomService.service getAllByState error code: ' + restResponse.error_code);
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
                console.log('ClassroomService.service getById error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    /*
        * 3
        * */
    getAll(): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/all`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('ClassroomService.service getAll error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }
    //
    // sendStudent(classRoom, idn): Observable<any> {
    //     return this.http.get(`${this.PARENT_URL}/setStudent/${classRoom}/${idn}`,  this.httpOptions).pipe(map((res) => {
    //         const restResponse: ResponseRestApi = new ResponseRestApi(res);
    //         if (restResponse.isError()) {
    //             console.log('ClassroomService.service getAll error code: ' + restResponse.error_code);
    //             throw new Error(restResponse.error_description);
    //         }
    //         return restResponse.data;
    //     }));
    // }

    getClassroomByBookId(bookId): Observable<any> {
        console.log('2');
        return this.http.get(`${this.PARENT_URL}/getByBookId/${bookId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            console.log('3');
            if (restResponse.isError()) {
                console.log('ClassroomService.service getById error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }




    getClassroomByTeacherId(teacherId): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/read/byTeacherId/${teacherId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            console.log('3');
            if (restResponse.isError()) {
                console.log('ClassroomService.service getClassroomByTeacherId error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getStudentInfosByTeacherId(teacherId): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/read/student/info/byTeacherId/${teacherId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            console.log('3');
            if (restResponse.isError()) {
                console.log('ClassroomService.service getStudentInfosByTeacherId error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    sendStudent(classRoom, idn): Observable<any> {
        console.log('2');
        return this.http.get(`${this.PARENT_URL}/setStudent/${classRoom}/${idn}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            console.log('3');
            if (restResponse.isError()) {
                console.log('ClassroomService.service getById error code: ' + restResponse.error_code);
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
    // sendStudent(classRoom, idn): Observable<any> {
    //     console.log('------------------1--3------------------------')
    //     console.log('classRoom ' + classRoom);
    //     console.log('idn ' + idn);
    //
    //     return this.http.post(`${this.PARENT_URL}/setStudent/${classRoom}/${idn}`, this.httpOptions).pipe(
    //         map(res => {
    //             console.log('------------------1333-------------------------')
    //
    //             const restResponse: ResponseRestApi = new ResponseRestApi(res);
    //             if (restResponse.isError()) {
    //                 console.log('ERROR:' + restResponse.error_description);
    //                 throw new Error(restResponse.error_description);
    //             }
    //             return restResponse.data;
    //         }));
    // }

    /*
    * 6
    * */
    delete(deleteId): Observable<any> {
        return this.http.delete(`${this.PARENT_URL}/delete/${deleteId}`, this.httpOptions).pipe(
            map(res => {
                const restResponse: ResponseRestApi = new ResponseRestApi(res);
                if (restResponse.isError()) {
                    console.log('ClassroomService.service delete error code: ' + restResponse.error_code);
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
                    console.log('ClassroomService.service disable error code: ' + restResponse.error_code);
                    throw new Error(restResponse.error_description);
                }
                return restResponse.data;
            }));
    }
}
