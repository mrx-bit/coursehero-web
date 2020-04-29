import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fadeInAnimation} from '../../../../core/route-animation/route.animation';
import {MatDialog} from '@angular/material';
import {ApplicationBookService} from '../core/services/application-book.service';
import {ApplicationBookAddEditComponent} from './application-book-add-edit/application-book-add-edit.component';
import {BooksService} from '../core/services/books.service';

@Component({
    selector: 'app-application-book',
    templateUrl: './application-book.component.html',
    styleUrls: ['./application-book.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})
export class ApplicationBookComponent implements OnInit {
    dialogRef: any;
    displayedColumns = ['user', 'book', 'status'];
    datasource: any;

    constructor(private _matDialog: MatDialog,
                private _booksService: BooksService,
                private _service: ApplicationBookService) {
    }

    ngOnInit() {
        this.getAll();
        // this.getAllBooks();
    }

    getAll(): void {
        this._service.getAllCustom().subscribe(response => {
            this.datasource = response;
        }, err => {
            console.error(err);
        });
    }

    update(model): void {
        this._service.update(model).subscribe(response => {
            this.getAll();
        }, err => {
            console.error(err);
        });
    }

    contentControl(item?: any): void {
        this.dialogRef = this._matDialog.open(ApplicationBookAddEditComponent, {
            panelClass: 'ms-application-book-add-edit',
            data: {
                applicationBook: item,
                book: this.datasource.applicationBookMap[item.bookId],
                user: this.datasource.applicationUserMap[item.teacherId]
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.update(response[0]);
        });
    }

}
