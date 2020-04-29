import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {TourService} from 'ngx-tour-md-menu';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CoreService} from '../service/core/core.service';
import {HorizontalMenuItems} from './horizontal-menu-items';
import {EcommerceService} from './ecommerce.service';
import {AuthService} from '../service/auth.service';
import {MenuService} from '../service/menu.service';
import {ServiceCommonConstant} from '../core/constant/service-common.constant';
import {User} from '../core/model/alippe/user';

declare var require: any;
const screenfull = require('screenfull');

@Component({
    selector: 'app-horizontal-layout',
    templateUrl: './horizontal-layout.component.html',
    styleUrls: ['./horizontal-layout.component.scss'],
    host: {
        '(window:resize)': 'onResize($event)'
    }
})
export class HorizontalLayoutComponent implements OnInit {
    root = 'ltr';
    currentLang = 'en';
    dark: boolean;
    user: User;
    compactSidebar: boolean;
    customizerIn = false;
    search = false;

    isMobile = false;
    header: string;
    layout: any = 'ltr';


    private _routerEventsSubscription: Subscription;
    private _router;

    @ViewChild('horizontalSideNav', {static: true}) horizontalSideNav;
    book: any;
    chatList: any [] = [
        {
            image: 'assets/img/user-1.jpg',
            name: 'John Smith',
            chat: 'Lorem ipsum simply dummy',
            mode: 'online'
        },
        {
            image: 'assets/img/user-2.jpg',
            name: 'Amanda Brown',
            chat: 'Lorem ipsum simply dummy',
            mode: 'online'
        },
        {
            image: 'assets/img/user-3.jpg',
            name: 'Justin Randolf',
            chat: 'Lorem ipsum simply dummy',
            mode: 'offline'
        },
        {
            image: 'assets/img/user-4.jpg',
            name: 'Randy SunSung',
            chat: 'Lorem ipsum simply dummy',
            mode: 'online'
        },
        {
            image: 'assets/img/user-5.jpg',
            name: 'Lisa Myth',
            chat: 'Lorem ipsum simply dummy',
            mode: 'online'
        },
    ];
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    constructor(
        public translate: TranslateService,
        private router: Router,
        private _service: AuthService,
        public _serviceMenu: MenuService,
        public coreService: CoreService
    ) {

        if (localStorage.getItem('bookId')) {
            this._serviceMenu.bookId = localStorage.getItem('bookId');
        }
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/kz|en/) ? browserLang : 'kz');
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this._routerEventsSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && this.isMobile) {
                this.horizontalSideNav.close();
            }
        });
    }

    showSearch(): void {
        this.search = !this.search;
    }

    /**
     *As router outlet will emit an activate event any time a new component is being instantiated.
     */
    onActivate(e, scrollContainer) {
        scrollContainer.scrollTop = 0;
    }

    /**
     * addClassOnBody method is used to add a add or remove class on body.
     */
    addClassOnBody(event) {
        const body = document.body;
        if (event.checked) {
            body.classList.add('dark-theme-active');
        } else {
            body.classList.remove('dark-theme-active');
        }
    }

    /**
     * logOut method is used to log out the template.
     */
    logOut() {
        this._service.logout();
    }

    /**
     * changeRTL method is used to change the layout of template.
     */
    changeRTL(isChecked) {
        if (isChecked) {
            this.layout = 'rtl'
        } else {
            this.layout = 'ltr'
        }
    }

    /**
     *chatMenu method is used to toggle a chat menu list.
     */
    chatMenu() {
        document.getElementById('gene-chat').classList.toggle('show-chat-list');
    }

    /**
     * onChatOpen method is used to open a chat window.
     */
    onChatOpen() {
        document.getElementById('chat-open').classList.toggle('show-chat-window');
    }

    /**
     * onChatWindowClose method is used to close the chat window.
     */
    chatWindowClose() {
        document.getElementById('chat-open').classList.remove('show-chat-window');
    }

    onResize(event) {
        if (event.target.innerWidth < 1200) {
            this.coreService.horizontalSideNavMode = 'over';
            this.coreService.horizontalSideNavOpen = false;
            const main_div = document.getElementsByClassName('app');
            for (let i = 0; i < main_div.length; i++) {
                if (!(main_div[i].classList.contains('sidebar-overlay'))) {
                    if (document.getElementById('main-app')) {
                        document.getElementById('main-app').className += ' sidebar-overlay';
                    }
                }
            }
        } else {
            // for responsive
            const main_div = document.getElementsByClassName('app');
            for (let i = 0; i < main_div.length; i++) {
                if (main_div[i].classList.contains('sidebar-overlay')) {
                    document.getElementById('main-app').classList.remove('sidebar-overlay');
                }
            }
        }
    }

}
