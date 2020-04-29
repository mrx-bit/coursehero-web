import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../../../@fuse/animations';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'book-content',
    templateUrl: './book-content.component.html',
    styleUrls: ['./book-content.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookContentComponent implements OnInit, OnDestroy {
//
//     @Input() book: any;
//     private _unsubscribeAll: Subject<any>;
//     dialogRef: any;
//     pageItemCount: any[];
//     searchString: string;
//     globalLoading: any;
//     linkList;
//
//     configs: any = {
//         id_field: 'id',
//         parent_id_field: 'parentId',
//         parent_display_field: 'title',
//         columns: [
//             {
//                 name: 'title',
//                 header: 'Названия',
//                 width: '150px',
//                 height: '30px'
//             },
//             {
//                 name: 'description',
//                 header: 'Описания',
//                 height: '30px'
//             },
//             {
//                 name: 'pageNumber',
//                 header: 'Страница',
//                 renderer: function (value) {
//                     return value + '-я страница';
//                 },
//                 height: '30px'
//             }
//         ]
//     };
//
//     constructor(private _matDialog: MatDialog,
//                 private _matSnackBar: MatSnackBar,) {
//         this._unsubscribeAll = new Subject();
//     }
//
    ngOnInit(): void {
        // this.pageItemCount = [5, 10, 15, 50, 100];
        // this.getAllLinkList();
    }

    ngOnDestroy(): void {
        // this._unsubscribeAll.next();
        // this._unsubscribeAll.complete();
    }
//
//     getAllLinkList(): void {
//         this.globalLoading = true;
//         this._linkService.getAllByBookId(this.book.id).subscribe(response => {
//             this.linkList = response;
//             console.log('Class: BookContentComponent, Function: , Line 59 (): ', this.linkList);
//         }, err => {
//             console.error('Error while fetching link [getAllLinkList()]');
//         }, () => {
//             this.globalLoading = false;
//         });
//     }
//
//     getBySearch(): void {
//         this.globalLoading = true;
//         if (this.searchString !== '') {
//             this._linkService.getLinksWithStrWithoutPagination(this.searchString, this.book.id).subscribe(response => {
//                 this.linkList = response;
//             }, err => {
//                 console.error('Error while searching template [getBySearch()]');
//             }, () => {
//                 this.globalLoading = false;
//             });
//         } else {
//             this.getAllLinkList();
//         }
//     }
//
//     contentControl(action: string, item?: any): void {
//         if (action === 'new') {
//             item = new Link(this.book.id, this.book.code);
//         }
//
//         this.dialogRef = this._matDialog.open(BContentAddEditComponent, <MatDialogConfig>{
//             panelClass: 'bcontent-form-dialog',
//             data: {
//                 action: action,
//                 link: item,
//                 linkList: this.linkList
//             }
//         });
//
//         this.dialogRef.afterClosed().subscribe(response => {
//
//             if (!response) {
//                 return;
//             }
//             const actionType: string = response[0];
//             const formData: FormGroup = response[1];
//
//             switch (actionType) {
//                 case 'add'   :
//                     this.create(formData.getRawValue());
//                     break;
//                 case 'save'  :
//                     this.update(formData.getRawValue());
//                     break;
//                 case 'delete':
//                     this.delete(formData.getRawValue());
//                     break;
//                 case 'disable':
//                     this.disable(formData.getRawValue());
//                     break;
//             }
//
//         });
//     }
//
//     create(data): void {
//         this.globalLoading = true;
//         this._linkService.create(data).subscribe(response => {
//             this.getAllLinkList();
//             this.notification('Глава добавлено успешно');
//         }, err => {
//             console.error('Error while adding template [addTemplate()]');
//         });
//     }
//
//     update(data): void {
//         this.globalLoading = true;
//         console.log('Class: BookContentComponent, Function: update, Line 150 data(): ', data);
//         this._linkService.update(data).subscribe(response => {
//             this.getAllLinkList();
//             this.notification('Глава редактировано успешно');
//         }, err => {
//             console.error('Error while saving template [saveTemplate()]');
//         });
//     }
//
//     delete(data): void {
//         this.globalLoading = true;
//         this._linkService.delete(data.id).subscribe(response => {
//             this.getAllLinkList();
//             this.notification('Глава удалено успешно');
//         }, err => {
//             console.error('Error while deleting template [deleteTemplate()]');
//         });
//     }
//
//     disable(data): void {
//         this.globalLoading = true;
//         this._linkService.disable(data.id).subscribe(response => {
//             this.getAllLinkList();
//             this.notification('Глава редактивирована успешно');
//         }, err => {
//             console.error('Error while deleting template [deleteTemplate()]');
//         });
//     }
//
//     notification(message): void {
//         // Show the success message
//         const snackBarRef = this._matSnackBar.open(message, 'Да', <MatSnackBarConfig>{
//             verticalPosition: 'top',
//             duration: 2000
//         });
//         this.globalLoading = false;
//     }
//
//
//     editNode(event): void {
//         console.log('Class: BookContentComponent, Function: editNode, Line 208 event(): ', event);
//     }
//
}
