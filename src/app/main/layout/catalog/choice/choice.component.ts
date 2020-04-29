import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ChoiceService} from './service/choice.service';
import {Choice} from './model/choice';
import {
    MatDialog,
    MatDialogRef,
    MatSnackBar,
    MatTableDataSource
} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FuseConfirmDialogComponent} from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {fuseAnimations} from '../../../../../@fuse/animations';

export class Breadcumb {
    public name?: any;
    public url?: any;

    constructor(name: any, url: any) {
        this.name = name;
        this.url = url;
    }
}

@Component({
    selector: 'app-choice',
    templateUrl: './choice.component.html',
    styleUrls: ['./choice.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChoiceComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['code', 'nameRu', 'nameKz', 'nameEn', 'action'];
    dataSource: any;
    items: Breadcumb[];
    home: Breadcumb;
    choice: Choice[];
    showModal = false;
    cols: any[];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    private _unsubscribeAll: Subject<any>;
    loading = true;

    constructor(
        private service: ChoiceService,
        private router: Router,
        public snackBar: MatSnackBar,
        public _matDialog: MatDialog
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {

        this.cols = [
            {field: 'nameKz', header: 'Атауы'},
            {field: 'nameRu', header: 'Наименование'},
            {field: 'nameEn', header: 'Name'}
        ];
        this.loadAllChoice();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadAllChoice(): void {
        this.loading = true;
        this.service.getChoiceList()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                this.choice = response;
                this.dataSource = new MatTableDataSource(response);
                this.openSnackBar('Choicelist loaded:' + this.choice.length);
                this.loading = false;
            });
    }

    applyFilter(filterValue): void {
        this.dataSource.filter = filterValue.value.trim().toLowerCase();
    }

    addChoice(): void {
        this.router.navigate(['/app/catalog/add']);

    }

    updChoice(itemId: string): void {
        if (itemId) {
            this.router.navigate(['/app/catalog/edit/' + itemId]);
        }
    }

    delChoice(item: any): void {
        if (item.id) {
            this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
                disableClose: false
            });
            this.confirmDialogRef.componentInstance.confirmMessage = `Вы точно хатите удалить? ${item.nameRu}`;

            this.confirmDialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.service.deleteCoiceList(item.id)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe(response => {
                            if (response) {
                                this.loadAllChoice();
                            }
                        });
                }
                this.confirmDialogRef = null;
            });
        }
    }

    openSnackBar(message: string): void {
        this.snackBar.open(message, null, {
            duration: 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }


}
