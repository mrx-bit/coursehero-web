import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fadeInAnimation} from '../../../../core/route-animation/route.animation';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';
import {PageTitleService} from '../service/page-title.service';
import {ChatService} from '../service/chat.service';
import {ClassroomService} from '../../bbook/core/services/classroom.service';
import {User} from '../../../../core/model/alippe/user';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Chats} from '../model/chats';
import {Messages} from '../model/messages';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {

    selectedChat: any;
    newMessage: string;
    chats: Chats[] = [];
    availableChats: Chats[] = [];
    typing = false;

    ws: any;

    user: User;

    studentInfos: any[] = [];

    page = 0;

    @ViewChild('chatnavbar', {static: false}) chatSidebar;

    randomMessages: any[] = [
        'How are you?',
        'We are glad to know',
        'How can I help you?',
        'We are happy to help you'
    ];

    @ViewChild('chatScroll', {static: false}) public directiveScroll: PerfectScrollbarComponent;

    disabled = true;
    private stompClient = null;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private classroomService: ClassroomService,
        private pageTitleService: PageTitleService,
        private service: ChatService
    ) {
        this._unsubscribeAll = new Subject<any>();
        this.connect();
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.loadStudentInfosByTeacherId();
        this.loadChats();

        this.pageTitleService.setTitle('Chat');

        // this.service.getChatContent().subscribe(res => {
        //         this.chats = res
        //     },
        //     err => console.log(err),
        //     () => this.selectedChat = this.chats[0]
        // );
    }

    ngOnDestroy(): void {
        this.disconnect();

        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadStudentInfosByTeacherId(): void {
        this.classroomService.getStudentInfosByTeacherId(this.user.id).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.studentInfos = res;
            const parents = [];
            for (let i = 0; i < this.studentInfos.length; i++) {
                const parent = this.studentInfos[i].parent;

                if (!parents.includes(parent.id)) {
                    const chat = new Chats();
                    chat.from = parent.id;
                    chat.fromUser = parent;
                    chat.userId = this.user.id;
                    chat.user = this.user;
                    chat.messages = [];
                    chat.photo = this.user.avatarId;

                    this.availableChats.push(chat);

                    if (i === 0) {
                        this.selectChat(chat);
                    }

                    parents.push(parent.id);
                }


            }
        })
    }

    loadChats(): void {
        this.service.getChatsByUserId(this.user.id).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.chats = res;
        });
    }

    /**
     * isOver method is used to open the chat side nav bar
     * according to window width
     */
    isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }

    /**
     * onSelect method is used to select the paticular chart.
     */
    onSelect(chat): void {
        this.selectChat(chat);
    }

    /**
     * send method is used to send a new message.
     */
    send() {
        if (this.newMessage) {

            console.log('selectedChat', this.selectedChat);

            const message = new Messages();
            message.from = this.selectedChat.from;
            message.msg = this.newMessage;
            message.time = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
            message.chatId = this.selectedChat.id;
            message.from = 'me';

            this.createMessage(message);
            this.newMessage = '';
            // this.selectedChat.messages.push({
            //     msg: this.newMessage,
            //     from: 'me',
            //     time: new Date().getHours() + ':' + new Date().getMinutes() + ':' +  new Date().getSeconds(),
            //     chatId: this.selectedChat.id
            // });
            // setTimeout(() => {
            //     this.typing = true;
            //     this.getReply();
            // }, 3000);
        }
    }

    selectChat(chat: Chats): void {
        const params = 'userId=' + chat.userId + '&from=' + chat.from + '&page=' + this.page;
        this.service.getChat(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            if (res === null || res === undefined) {
                this.createChat(chat);
            } else {
                this.selectedChat = res;
            }
        });
    }

    createChat(chat: Chats) {
        this.service.createChat(chat).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.selectedChat = res;
        });
    }

    createMessage(message: Messages): void {
        this.stompClient.send(
            '/app/secured/message',
            {'x-auth-token': localStorage.getItem('token')},
            JSON.stringify(message)
        );
        // this.service.createMessage(message).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
        //     if (this.selectedChat.messages.length === 0) {
        //         this.selectedChat.messages = [];
        //     }
        //     this.selectedChat.messages.push(res);
        // });
    }

    /**
     * getReply function is used to Reply a message to admin
     */
    getReply() {
        const message = this.randomMessages[Math.floor(Math.random() * this.randomMessages.length)];
        const reply = {
            msg: message,
            from: 'them',
            time: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
        };
        setTimeout(() => {
            this.typing = false;
            setTimeout(() => {
                this.selectedChat.messages.push(reply);
            }, 200);
        }, 3000);
    }

    /**
     * clearMessage method is to clear the chat.
     */
    clearMessages() {
        this.selectedChat.messages.length = 0;
    }

    ngAfterViewChecked() {
        if (this.directiveScroll) {
            this.directiveScroll.directiveRef.scrollToBottom();
        }
    }

    chatSideBarToggle() {
        this.chatSidebar.toggle();
        document.getElementById('chat-sidebar-container').classList.toggle('chat-sidebar-close');
    }

    connect(): void {
        const socket = new SockJS('http://localhost:9218/secured/ws?' + localStorage.getItem('token'));

        this.stompClient = Stomp.over(socket);
        const _this = this;
        this.stompClient.connect({}, function (frame) {
            _this.setConnected(true);
            console.log('Connected: ' + frame);
            // _this.readMessage();
            // notification subscription
            // _this.stompClient.subscribe('/secured/history', function (hello) {
            //     console.log('Websocket callback received: ' + JSON.stringify(hello.body));
            //     _this.showGreeting(hello.body);
            // });

            _this.stompClient.subscribe('/user/secured/reply', function (response) {
                console.log('Websocket to specific user callback received: ' + (response.body));
                const chat: Chats = JSON.parse(response.body);
                _this.getChatData(chat);
                // _this.pushNewMessage(JSON.parse(hello.body));
            });
        }, function (error) {
            alert('STOMP error ' + error);
            console.error('STOMP error ' + error);
        });
        this.selectedChat = _this.selectedChat;
    }

    getChatData(chat: Chats): void {
        // console.log('chat', chat);
        console.log('chatId', chat.id);
        console.log('selectedChatId', this.selectedChat.id);
        if (this.selectedChat.id === chat.id) {
            this.selectedChat = chat;
        }
    }

    disconnect() {
        if (this.stompClient != null) {
            this.stompClient.disconnect();
        }
        this.setConnected(false);
        console.log('Disconnected!');
    }

    setConnected(connected: boolean): void {
        this.disabled = !connected;

    }

}
