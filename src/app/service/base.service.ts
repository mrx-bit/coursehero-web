import {HttpClient} from '@angular/common/http';
import {ResponseRestApi} from '../Shared/model/response';

export class BaseService {

    constructor(protected http: HttpClient, protected path: string, protected serviceName: string) {
    }

    process(response: any, methodName: string) {
        const responseRestApi: ResponseRestApi = new ResponseRestApi(response);
        if (responseRestApi.isError()) {
            console.error(`ERROR :: ${this.serviceName}.${methodName} --> ${responseRestApi.error_description}`);
            throw new Error(responseRestApi.error_description);
        }
        return responseRestApi;
    }

    processData(response: any, methodName: string) {
        return this.process(response, methodName).data;
    }
}
