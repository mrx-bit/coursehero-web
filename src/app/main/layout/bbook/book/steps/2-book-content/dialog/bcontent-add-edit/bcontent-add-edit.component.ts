import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PageService} from '../../../../../core/services/page.service';
import {ReplaySubject, Subject} from 'rxjs/Rx';
import {Link} from '../../../../../core/models/link';
import {takeUntil} from 'rxjs/operators';
import {StateConstant} from '../../../../../core/constants/state.constant';
import {fuseAnimations} from '../../../../../../../../../@fuse/animations';
import {ContentService} from '../../../../../core/services/content.service';

@Component({
    selector: 'app-bcontent-add-edit',
    templateUrl: './bcontent-add-edit.component.html',
    styleUrls: ['./bcontent-add-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BContentAddEditComponent implements OnInit, OnDestroy {

    dialogTitle: any;
    linkForm: FormGroup;
    private _unsubscribeAll: Subject<any>;
    action: any;
    link: Link;
    linkList: Link[];
    public filterCtrl = new FormControl();

    listPage: any[];
    listPageFiltered: any[];
    public filteredCatalog: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

    constructor(public matDialogRef: MatDialogRef<BContentAddEditComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private _formBuilder: FormBuilder,
                private _pageService: PageService,
                private _contentService: ContentService) {
        this._unsubscribeAll = new Subject();
        // Set the defaults
        this.action = _data.action;
        this.link = _data.link;
        this.linkList = _data.linkList;
        this.linkForm = this.createLinkForm();
        this.dialogTitle = this.action === 'edit' ? 'Редактирования главы для книги' : 'Добавления главы для книги';
        console.log(this.dialogTitle);
    }

    ngOnInit(): void {
        this.fetchPageList();
        console.log('ContentId', )
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    fetchPageList(): void {
        this.listPage = [];
        this.listPageFiltered = [];

        this.getPages();

        this.filteredCatalog.next(this.listPage.slice());

        this.filterCtrl.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.listPageFiltered = this.listPage;
                this.filterCatalog();
            });
    }

    filterCatalog(): void {
        if (!this.listPage) {
            return;
        }
        // get the search keyword
        let search = this.filterCtrl.value;
        if (!search) {
            this.filteredCatalog.next(this.listPage.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredCatalog.next(
            this.listPageFiltered = this.listPage.filter(page => page.number.toString().toLowerCase().indexOf(search) > -1 )
        );
    }

    getPages(): void {
        this._pageService.getAllByState(StateConstant.ACTIVE).subscribe(response => {
            this.listPage = response;
            this.listPageFiltered = this.listPage;
            console.log('Class: BContentAddEditComponent, Function: getPages, Line 93 (): ', this.listPage);
        });
    }

    createLinkForm(): FormGroup {
        return this._formBuilder.group({
            id         : [this.link.id],
            parentId   : [this.link.parentId],
            hasParent  : [this.link.hasParent],
            title      : [this.link.title],
            description: [this.link.description],
            bookId     : [this.link.bookId],
            pageId     : [this.link.pageId],
            pageNumber : [this.link.pageNumber],
            state      : [this.link.state]
        });
    }
}
