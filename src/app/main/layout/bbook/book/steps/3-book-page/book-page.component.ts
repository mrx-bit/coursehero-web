import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {PageService} from '../../../core/services/page.service';
import {Page} from '../../../core/models/page';
import {fuseAnimations} from '../../../../../../../@fuse/animations';


class TableStatus {
    public static VIEW = 'view';
    public static EDIT = 'edit';
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'book-page',
    templateUrl: './book-page.component.html',
    styleUrls: ['./book-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookPageComponent implements OnInit, OnDestroy {

    @Input() book: any;
    private _unsubscribeAll: Subject<any>;
    displayedColumns = ['number', 'description', 'actions'];

    dialogRef: any;

    paginationTotalElements: any = 0;
    paginationRows: any;
    pageItemCount: any[];
    searchString: string;

    globalLoading: any;
    bookList = [];
    pageIter = 0;

    newPage: Page;
    editPage: Page;
    tableStatus = TableStatus.VIEW;

    constructor(private _matDialog: MatDialog,
                private _matSnackBar: MatSnackBar,
                private _pageService: PageService) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.pageItemCount = [5, 10, 15, 50, 100];
        this.getPageList();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getPageList(): void {
        const params = 'bookId=' + this.book.id;
        this.newPage = new Page(this.book.id, this.book.code);
        this.globalLoading = true;
        this._pageService.getPage(params).subscribe(response => {
            this.globalLoading = false;
            this.bookList = response.content;
            console.log('Class: BookPageComponent, Function: getPageList, Line 59 (): ', this.bookList);
            this.paginationTotalElements = parseInt(response.total, 10);
            this.paginationRows = parseInt(response.pageable.size, 10);
        }, err => {
            console.error('Error while fetching template [getLinkList()]');
        });
    }

    getAllByBookId(): void {
        this._pageService.getAllByBookId(this.book.id).subscribe(response => {
            this.globalLoading = false;
            this.bookList = response;
        }, err => {
            console.error('Error while fetching template [getAllByBookId()]');
        });
    }

    changeTableList(event): void {
        this.pageIter = event.pageIndex;
        const params = 'bookId=' + this.book.id + '&page=' + event.pageIndex + '&size=' + event.pageSize;
        this.globalLoading = true;
        this._pageService.getPage(params).subscribe(response => {
            this.bookList = response.content;
            this.globalLoading = false;
            this.paginationTotalElements = parseInt(response.total, 10);
            this.paginationRows = parseInt(response.pageable.size, 10);
        }, err => {
            console.error('Error while paging template [changeTableList()]');
        });
    }

    getBySearch(): void {
        this.globalLoading = true;
        if (this.searchString !== '') {
            this._pageService.getPagesWithStr(this.searchString, this.book.id).subscribe(response => {
                this.bookList = response.content;
                this.globalLoading = false;
                this.paginationTotalElements = parseInt(response.total, 10);
                this.paginationRows = parseInt(response.pageable.size, 10);
            }, err => {
                console.error('Error while searching template [getBySearch()]');
            });
        } else {
            this.getPageList();
        }
    }

    create(): void {
        this.globalLoading = true;
        this._pageService.create(this.newPage).subscribe(response => {
            this.getPageList();
            this.notification('Страница добавлено успешно');
        }, err => {
            console.error('Error while adding page [create()]');
        });
    }

    update(data): void {
        console.log('Class: BookPageComponent, Function: update, Line 127 data(): ', data);
        this.globalLoading = true;
        this._pageService.update(data).subscribe(response => {
            if (this.searchString !== '') {
                this.getBySearch();
            } else {
                this.getPageList();
            }
            this.notification('Страница редактировано успешно');
        }, err => {
            console.error('Error while saving page [update()]');
        }, () => {
            this.tableStatus = TableStatus.VIEW;
        });
    }

    delete(data): void {
        this.globalLoading = true;
        this._pageService.delete(data.id).subscribe(response => {
            this.getPageList();
            this.notification('Страница удалено успешно');
        }, err => {
            console.error('Error while deleting page [delete()]');
        });
    }

    disable(data): void {
        this.globalLoading = true;
        this._pageService.disable(data.id).subscribe(response => {
            this.getPageList();
            this.notification('Страница деактивировано успешно');
        }, err => {
            console.error('Error while disabling page [disable()]');
        });
    }

    notification(message): void {
        // Show the success message
        const snackBarRef = this._matSnackBar.open(message, 'Да', <MatSnackBarConfig>{
            verticalPosition: 'top',
            duration: 2000
        });
        this.globalLoading = false;
    }

}
