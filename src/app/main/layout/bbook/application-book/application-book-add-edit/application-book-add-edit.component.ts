import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {ApplicationBook} from '../../core/models/applicationBook';
import {User} from '../../../../../core/model/alippe/user';
import {Book} from '../../core/models/book';

@Component({
    selector: 'ms-application-book-add-edit',
    templateUrl: './application-book-add-edit.component.html',
    styleUrls: ['./application-book-add-edit.component.scss']
})
export class ApplicationBookAddEditComponent implements OnInit {

    applicationBook: ApplicationBook = new ApplicationBook();
    user: User;
    book: Book;

    constructor(@Inject(MAT_DIALOG_DATA) public _data: any,
                public matDialogRef: MatDialogRef<ApplicationBookAddEditComponent>,
    ) {
        this.applicationBook = this._data.applicationBook;
        this.user = this._data.user;
        this.book = this._data.book;
    }

    ngOnInit() {
    }

}
