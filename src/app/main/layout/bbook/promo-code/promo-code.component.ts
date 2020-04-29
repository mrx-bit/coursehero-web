import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {CoreService} from '../content/core.service';
import {PageTitleService} from '../../../../core/page-title/page-title.service';
import {BooksService} from '../core/services/books.service';
import {PromoCodeService} from '../core/services/promo-code.service';
import {PromoCode} from '../core/models/promoCode';
import {Book} from '../core/models/book';
import {PromoCodeGenerateComponent} from './promo-code-generate/promo-code-generate.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-promo-code',
    templateUrl: './promo-code.component.html',
    styleUrls: ['./promo-code.component.scss']
})
export class PromoCodeComponent implements OnInit {
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    dialogRef: any;
    displayedColumns = ['bookId', 'serial', 'promoCode', 'activate', 'activatedBy'];
    selection = new SelectionModel<any>(true, []);
    selectedBook: Book;
    books: Book[] = [];
    promoCodes: PromoCode[] = [];

    constructor(private coreService: CoreService,
                private _matDialog: MatDialog,
                private pageTitleService: PageTitleService,
                private _booksService: BooksService,
                private _service: PromoCodeService) {
    }

    ngOnInit() {
        this.pageTitleService.setTitle('User Management')
        this.getAllBooks();
    }

    getPromoCodesByBook(): void {
        this._service.getAllByBook(this.selectedBook.id).subscribe(response => {
            this.promoCodes = response;
        }, err => {
            console.error(err);
        });
    }

    getAllBooks(): void {
        this._booksService.getAllBooks().subscribe(response => {
            this.books = response.data;
            if (this.books [0]) {
                console.log(0)
                this.selectedBook = this.books[0];
                this.getPromoCodesByBook();
            }
        }, err => {
            console.error(err);
        });
    }

    contentControl(): void {
        this.dialogRef = this._matDialog.open(PromoCodeGenerateComponent, {
            data: {
                object: this.selectedBook,
            }
        });

        this.dialogRef.afterClosed().subscribe(response => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const count: number = response[1];
            switch (actionType) {
                case 'generate':
                    this.generate(count);
                    break;
            }
        });
    }

    generate(count): void {
        this._service.generate(this.selectedBook.id, count).subscribe(response => {
            this.getPromoCodesByBook();
        }, err => {
        });
    }

    report() {
        this._service.downloadReportForm(this.selectedBook.id).subscribe(res => {
            const byteArray = new Uint8Array(res);
            // const blob = new Blob([byteArray], {type: 'application/octet-stream'});
            const blob = new Blob([byteArray], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const date = new Date();
            const fileName = date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear() + ':' + this.selectedBook.name + '.xlsx';

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else {
                const objectUrl = URL.createObjectURL(blob);
                const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

                a.href = objectUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();

                document.body.removeChild(a);
                URL.revokeObjectURL(objectUrl);
            }
        })

    }
}
