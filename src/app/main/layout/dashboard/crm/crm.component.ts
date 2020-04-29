import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageTitleService} from '../../../../core/page-title/page-title.service';
import {Book} from '../../bbook/core/models/book';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BooksService} from '../../bbook/core/services/books.service';
import {ServiceCommonConstant} from '../../../../core/constant/service-common.constant';
import {Router} from '@angular/router';
import {MenuService} from '../../../../service/menu.service';
import {BookResponse} from '../../bbook/core/models/bookResponse';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dashboard',
    templateUrl: './crm.component.html',
    styleUrls: ['./crm.component.scss']
})
export class CrmComponent implements OnInit, OnDestroy {

    baseUrl = ServiceCommonConstant.bbookModuleUrl;
    book: Book[] = [];
    bookResponse: BookResponse;

    windowHeight: number;
    windowWidth: number;

    isMobile = false;
    isIpad = false;
    isIpadPro = false;

    private _unsubscribeAll: Subject<any>;

    constructor(private pageTitleService: PageTitleService,
                private _booksService: BooksService,
                private _router: Router,
                private _serviceMenu: MenuService
    ) {
        this._unsubscribeAll = new Subject();

        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;

        if (this.windowWidth < 750 && this.windowHeight < 900) {
            this.isMobile = true;
        } else if (this.windowWidth < 800 && this.windowHeight < 1030) {
            this.isIpad = true;
        } else if (this.windowWidth < 1030 && this.windowHeight < 1370) {
            this.isIpadPro = true;
        }

    }

    ngOnInit() {
        this._serviceMenu.bookId = null;
        localStorage.removeItem('bookId');

        this.bookResponse = new BookResponse();
        this.pageTitleService.setTitle('CRM');
        this.getAllBooksByCurrentUser();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getAllBooksByCurrentUser() {
        this._booksService.getBookByCurrentUser().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.bookResponse = res.data;
        })
    }

    selectAccessBook(bookId): void {
        localStorage.setItem('bookId', bookId);
        this._serviceMenu.bookId = bookId;
        this._router.navigate(['/dashboard/book'])

    }

    selectOtherBook(bookId): void {
        this._router.navigate(['/dashboard/classroom/' + bookId])
    }

}
