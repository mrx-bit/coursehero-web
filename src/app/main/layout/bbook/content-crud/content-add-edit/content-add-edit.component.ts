import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContentService} from '../../core/services/content.service';
import {Content} from '../../core/models/content';
import {BooksService} from '../../core/services/books.service';
import {Book} from '../../core/models/book';
import {Page} from '../../core/models/page';

@Component({
    selector: 'app-content-add-edit',
    templateUrl: './content-add-edit.component.html',
    styleUrls: ['./content-add-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentAddEditComponent implements OnInit {

    action: string;
    object: any;
    content: Content = new Content();
    dialogTitle: string;
    contentForm: FormGroup;
    list: Content[] = [];
    book: Book;
    pages: Page[];


    constructor(@Inject(MAT_DIALOG_DATA) public _data: any,
                private _formBuilder: FormBuilder,
                public matDialogRef: MatDialogRef<ContentAddEditComponent>,
                private _translateService: TranslateService,
                private _matDialog: MatDialog,
                private  _service: ContentService,
                private _booksService: BooksService,
    ) {
        this.action = _data.action;
        this.book = _data.book;
        this.list = _data.parents;
        if (this.action === 'edit') {
            console.log('edit');
            this.dialogTitle = 'Edit';
            this.content = this._data.object;
            this.contentForm = this.createContentForm();
        } else {
            this.dialogTitle = 'Add';
            this.content = new Content();
            this.contentForm = this.createContentForm();
        }


    }

    ngOnInit() {
        this.getPages();
    }
    getPages() {
        this._booksService.getAllPageByBookId(this.book.id).subscribe(response => {
            this.pages = response.data;
        }, err => {
            console.error(err);
        });
    }
    delete(): void {
        this.matDialogRef.close(['delete', this.contentForm]);
    }
    activate(): void {
        this.matDialogRef.close(['active', this.contentForm]);
    }
    createContentForm(): FormGroup {
        return this.contentForm = this._formBuilder.group({
            id: [this.content.id],
            tittle: [this.content.tittle, [Validators.required]],
            description: [this.content.description, [Validators.required]],
            parentId: [this.content.parentId],
            pageId: [this.content.pageId, [Validators.required]],
            bookId: [this.book.id],
        });
    }

}
