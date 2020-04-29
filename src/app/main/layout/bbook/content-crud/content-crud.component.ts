import {Component, OnInit, ViewEncapsulation, ViewChild, Input} from '@angular/core';
import {PageTitleService} from '../../../../core/page-title/page-title.service';
import {fadeInAnimation} from '../../../../core/route-animation/route.animation';
import {SelectionModel} from '@angular/cdk/collections';
import {CoreService} from '../content/core.service';
import {MatDialog, MatPaginator} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {ContentAddEditComponent} from './content-add-edit/content-add-edit.component';
import {ContentService} from '../core/services/content.service';
import {Content} from '../core/models/content';
import {Book} from '../core/models/book';
import {Page} from '../core/models/page';
import {BooksService} from '../core/services/books.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-content-crud',
    templateUrl: './content-crud.component.html',
    styleUrls: ['./content-crud.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})
export class ContentCrudComponent implements OnInit {
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    dialogRef: any;
    @Input() book: Book;
    usermanagelist: any;
    displayedColumns = ['title', 'parent', 'description', 'pageId', 'action'];
    contents: Content[];
    selection = new SelectionModel<any>(true, []);
    parentList: Content[];
    pages: Page[] = [];

    constructor(private coreService: CoreService,
                private _matDialog: MatDialog,
                private pageTitleService: PageTitleService,
                private _booksService: BooksService,
                private _service: ContentService) {
    }

    ngOnInit() {
        this.pageTitleService.setTitle('User Management');
        this.getAllContentList();
        this.getAllTitle();
        this.getPages();
    }

    getPages() {
        this._booksService.getAllPageByBookId(this.book.id).subscribe(response => {
            this.pages = response.data;
        }, err => {
            console.error(err);
        });
    }

    getAllTitle(): void {
        this._service.getAllByBookParent(this.book.id).subscribe(response => {
            this.parentList = response;
        }, err => {
            console.error(err);
        });
    }

    contentControl(action: string, item?: any): void {
        if (action === 'new') {
            item = new Content();
        }

        this.dialogRef = this._matDialog.open(ContentAddEditComponent, {
            data: {
                action: action,
                object: item,
                book: this.book,
                parents: this.parentList
            }

        });

        this.dialogRef.afterClosed().subscribe(response => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];

            switch (actionType) {
                case 'add':
                    this.addContent(formData.getRawValue());
                    break;
                case 'save':
                    this.saveContent(formData.getRawValue());
                    break;
                case 'delete':
                    this.deleteContent(formData.getRawValue());
                    break;
                case 'active':
                    this.activeContent(formData.getRawValue());
                    break;
            }
        });
    }

    addContent(data): void {
        console.log(data)
        this._service.create(data).subscribe(response => {
            this.getAllContentList();
            this.getAllTitle();
        }, err => {
            this.getAllContentList();
            this.getAllTitle();
            console.error(err);
        });
    }

    saveContent(data): void {
        console.log(data)

        this._service.update(data).subscribe(response => {
            this.getAllContentList();
            this.getAllTitle();
        }, err => {
            this.getAllContentList();
            this.getAllTitle();
            console.error(err);
        });
    }

    deleteContent(data): void {
        this._service.delete(data.id).subscribe(response => {
            this.getAllContentList();
            this.getAllTitle();
        }, err => {
            console.error(err);
        });
    }
    activeContent(data): void {
        this._service.active(data.id).subscribe(response => {
            this.getAllContentList();
            this.getAllTitle();
        }, err => {
            console.error(err);
        });
    }

    getAllContentList(): void {
        this._service.getAllByBook(this.book.id).subscribe(response => {
            this.contents = response;
        }, err => {
            console.error(err);
        });
    }

    getNameFromList(id: string): string {
        for (let i = 0; i < this.parentList.length; i++) {
            if (id === this.parentList[i].id) {
                return this.parentList[i].tittle;
            }
        }
        return '';
    }

    getNameFromListPages(id: string): number {
        for (let i = 0; i < this.pages.length; i++) {
            if (id === this.pages[i].id) {
                return this.pages[i].number;
            }
        }
        return 0;
    }
}
