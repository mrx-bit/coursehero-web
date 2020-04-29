import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ResponseRestApi} from '../../../../Shared/model/response';
import {ServiceCommonConstant} from '../../../../core/constants/service-common.constant';
import {Chats} from '../model/chats';
import {Messages} from '../model/messages';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private readonly PARENT_URL = ServiceCommonConstant.bbookModuleUrl + '/chats';

    collapseSidebar = false;
    collapseSidebarStatus: boolean;
    sidenavMode = 'side';
    sidenavOpen = true;
    horizontalSideNavMode = 'over';
    horizontalSideNavOpen = false;
    projectDetailsContent: any;
    editProductData: any;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        })
    };

    constructor(
        private matDialog: MatDialog,
        private http: HttpClient
    ) {
    }

    // getChatContent method is used to get the chat data from json file
    getChatContent() {
        return this.http.get('assets/data/chat.json').pipe(map(response => response));
    }

    getChats(from: string): Observable<any> {
        return this.http.get(this.PARENT_URL + '/read/chats/' + from, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);

            if (restResponse.isError()) {
                console.log('ChatService.service getChatsContent error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    getChatsByUserId(userId: string): Observable<any> {
        return this.http.get(this.PARENT_URL + '/read/chats/byUserId/' + userId, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);

            if (restResponse.isError()) {
                console.log('ChatService.service getChatsByUserId error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    getChat(params): Observable<any> {
        return this.http.get(this.PARENT_URL + '/read/chat?' + params, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);

            if (restResponse.isError()) {
                console.log('ChatService.service getChat error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    getChatByUserIdAndFrom(userId: string, from: string): Observable<any> {
        return this.http.get(this.PARENT_URL + '/read/chat/' + userId + '/' + from, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);

            if (restResponse.isError()) {
                console.log('ChatService.service getChatsByUserId error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    getChatMessages(params?: any): Observable<any> {
        if (!params) {
            params = '';
        }
        return this.http.get(this.PARENT_URL + '/read/chat/messages/pageable?' + params, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);

            if (restResponse.isError()) {
                console.log('ChatService.service getChatMessages error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    createChat(chat: Chats): Observable<any> {
        return this.http.post(this.PARENT_URL + '/create/chat', chat, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);

            if (restResponse.isError()) {
                console.log('ChatService.service createChat error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    createMessage(message: Messages): Observable<any> {
        return this.http.post(this.PARENT_URL + '/create/message', message, this.httpOptions).pipe(map((res) => {
            const restResponse: ResponseRestApi = new ResponseRestApi(res);

            if (restResponse.isError()) {
                console.log('ChatService.service createChat error code: ' + restResponse.error_code);
                throw new Error(restResponse.error_description);
            }

            return restResponse.data;
        }));
    }

    // getChatConent(from: string, params?: any): Chats[] {
    //     let chats: Chats[] = [];
    //     this.getChats(from).subscribe((res) => {
    //         chats = res;
    //         this.getChatMessages(params).subscribe((res) => {
    //             chats
    //         })
    //     });
    // }
}
