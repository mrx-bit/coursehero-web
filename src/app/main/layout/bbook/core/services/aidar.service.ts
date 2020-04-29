import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {ServiceCommonConstant} from '../../../../../core/constants/service-common.constant';
import {ResponseRestApi} from '../../../../../Shared/model/response';


@Injectable()
export class AidarService {

    private readonly PARENT_URL = ServiceCommonConstant.bbookModuleUrl + '/aidar';
    private readonly PARENT_URL_BOOK = ServiceCommonConstant.bbookModuleUrl + '/book';
    private readonly PARENT_URL_PAGE = ServiceCommonConstant.bbookModuleUrl + '/page';
    private readonly GET_BOOK_AND_AIDAR = ServiceCommonConstant.bbookModuleUrl + '/aidar/getBy';
    private readonly PARENT_URL_COMMENT = ServiceCommonConstant.bbookModuleUrl + '/aidar-comment';


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
    getAidarByType(bookId, bookCode): Observable<any> {
        return this.http.get(`${this.GET_BOOK_AND_AIDAR}/${bookId}/${bookCode}`, this.httpOptions)
            .pipe(map(res => {
                return res;
            }))
    }
    downloadReportForm(bookId): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/report/${bookId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAllByBook error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAllParams(params): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/all/params?${params}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAll error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAllCustomParams(params): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/all/custom/params?${params}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAll error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAll(): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/all`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAll error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAllByAidarTypeAndIdIsNot(type: string, currentAidarId: string): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/read/sidenav/aidar/list/${type}/${currentAidarId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAll error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    searchByAidarTypeAndBookId(type: string, bookId: string, searchString: string): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/search/sidenav/aidar/${type}/${bookId}/${searchString}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service searchByAidarTypeAndBookId error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAllComment(id): Observable<any> {
        return this.http.get(`${this.PARENT_URL_COMMENT}/${id}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAll error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    createComment(model): Observable<any> {
        return this.http.post(`${this.PARENT_URL_COMMENT}/create`, model, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAll error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }
    disableComment(id): Observable<any> {
        return this.http.delete(`${this.PARENT_URL_COMMENT}/disable/${id}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service disableComment error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAllByCode(code): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/allByType/${code}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAllByCode error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getMenu(): Observable<any> {
        return this.http.get(`${ServiceCommonConstant.adminModuleUrl}/resource/readInTree?type=menu&language=kz`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getMenu error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAllByContentId(id): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/allByContent/${id}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAllByCode error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    changeOrder(aidarId: string, order: number): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/change/order/${aidarId}/${order}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service changeOrder error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAllBook(): Observable<any> {
        return this.http.get(`${this.PARENT_URL_BOOK}/all`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAllBook error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    getAllPage(bookId): Observable<any> {
        return this.http.get(`${this.PARENT_URL_PAGE}/all/bookId/${bookId}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAllPage error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    uploadFile(file): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'x-auth-token': localStorage.getItem('token')
            })
        };
        return this.http.post(`${this.PARENT_URL}/upload/file`, file, httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service upload File error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    deleteFile(id): Observable<any> {
        console.log('service');

        return this.http.get(`${this.PARENT_URL}/delete/file/${id}`, this.httpOptions).pipe(map((res) => {
            console.log('service 2');

            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service upload File error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }
            return restResponse.data;
        }));
    }

    /*
    * 2
    * */
    getAllByState(state): Observable<any> {
        return this.http.get(`${this.PARENT_URL}/all/state/${state}`, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);
            if (restResponse.isError()) {
                console.log('AidarService.service getAllByState error code: ' + restResponse.error_code);
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
                console.log('AidarService.service getById error code: ' + restResponse.error_code);
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
                console.log('service');
                const restResponse: ResponseRestApi = new ResponseRestApi(res);
                if (restResponse.isError()) {
                    console.log('AidarService.service deleteOlympiad error code: ' + restResponse.error_code);
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
                    console.log('AidarService.service disableOlympiad error code: ' + restResponse.error_code);
                    throw new Error(restResponse.error_description);
                }
                return restResponse.data;
            }));
    }
}
