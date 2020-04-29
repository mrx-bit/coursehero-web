import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MatPaginator, MatSort, MatDialog} from '@angular/material';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {Router} from '@angular/router';
import {ContentService} from '../../core/services/content.service';
import {Content} from '../../core/models/content';
import {FuseConfirmDialogComponent} from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {AidarAddEditComponent} from '../aidar-add-edit/aidar-add-edit.component';
import {AidarCustom} from '../../core/models/aidar-custom';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'aidar',
    templateUrl: './aidar.component.html',
    styleUrls: ['./aidar.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AidarComponent implements OnInit {

    @Input() book: any;
    displayedColumns = ['order', 'name', 'description', 'bookId', 'pageId', 'backgroundImageSize', 'contentSize', 'buttons'];
    contents: Content[] = [];
    paginator: MatPaginator;
    paginationTotalElements: any = 0;
    paginationRows: any;
    searchString = '';
    sort: MatSort;
    page = 0;
    size = 5;
    filter: ElementRef;
    aidarCustom: AidarCustom[] = [];
    length: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private

    constructor(
        private _service: AidarService,
        private _matDialog: MatDialog,
        private _serviceContent: ContentService,
        private router: Router) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.getContentByBook();
        this.getAllAidar();
    }

    report() {
        this._service.downloadReportForm(this.book.id).subscribe(res => {
            const byteArray = new Uint8Array(res);
            // const blob = new Blob([byteArray], {type: 'application/octet-stream'});
            const blob = new Blob([byteArray], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const date = new Date();
            const fileName = date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear() + ':' + this.book.name + '.xlsx';

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

    getAllAidar(): void {
        const params = 'bookId=' + this.book.id + '&page=' + this.page + '&size=' + this.size;
        this._service.getAllCustomParams(params)
            .pipe()
            .subscribe(response => {
                this.aidarCustom = response.content;
                this.paginationTotalElements = parseInt(response.total, 10);
                this.paginationRows = parseInt(response.pageable.size, 10);
            });
    }

    changeTableList(event): void {
        const params = 'bookId=' + this.book.id + '&page=' + event.pageIndex + '&size=' + event.pageSize;
        this.page = event.pageIndex;
        this.size = event.pageSize;
        console.log(params)
        this._service.getAllCustomParams(params).subscribe(response => {
            this.aidarCustom = response.content;
            this.paginationTotalElements = parseInt(response.total, 10);
            this.paginationRows = parseInt(response.pageable.size, 10);
        }, err => {
            console.error(err);
        });
    }

    getContentByBook(): void {
        this._serviceContent.getAllByBook(this.book.id).subscribe(response => {
            this.contents = response;
        }, err => {
            console.error(err);
        });
    }

    getAllAidarBySearch(): void {
        if (this.searchString !== '') {
            const param = 'bookId=' + this.book.id + '&page=' + this.page + '&size=' + this.size + '&searchString=' + this.searchString;
            this._service.getAllCustomParams(param).subscribe(response => {
                this.aidarCustom = response.content;
                this.paginationTotalElements = parseInt(response.total, 10);
                this.paginationRows = parseInt(response.pageable.size, 10);
            }, err => {
                console.error(err);
            });
        } else {
            this.getAllAidar();
        }
    }

    changeOrder(aidar: any): void {
        this._service.changeOrder(aidar.id, aidar.order).subscribe((res) => {
            console.log('successfully changed');
        });
    }

    getContentName(contentId: any) {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].id === contentId) {
                return this.contents[i].tittle;
            }
        }
    }

    disableAidar(aidar): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Вы точно хотите удалить ' + aidar.name + ' ?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._service.disable(aidar.id).subscribe(response => {
                    this.getAllAidar();
                }, err => {
                });
            }
            this.confirmDialogRef = null;
        });
    }

    openEdit(id: any, id2: any) {
        this._matDialog.open(AidarAddEditComponent, {
            data: {
                aidarId: id,
                bookId: id2,
                type: 'edit'
            }
        });
    }
    newAidar(id: any) {
        this._matDialog.open(AidarAddEditComponent, {
            data: {
                bookId: id,
                type: 'new'
            }
        });
    }
}
