import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Choice, ChoiceValue} from '../model/choice';
import {ChoiceService} from '../service/choice.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ChoiceValueAddEditComponent} from './choice-value-add-edit/choice-value-add-edit.component';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-choice-add-edit',
    templateUrl: './choice-add-edit.component.html',
    styleUrls: ['./choice-add-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChoiceAddEditComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['code', 'name', 'displayNameRu', 'action'];
    dataSource: any;
    choice = new Choice();
    value = new ChoiceValue();
    values = [];
    edit = false;
    id: string;
    new = true;
    subscription: any;
    msg: string;
    choiceId: any;
    fieldsDisabled = true;
    private _unsubscribeAll: Subject<any>;
    loading = true;

    constructor(
        private service: ChoiceService,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.subscription = this.route.params.subscribe((params) => {
            this.id = params['id'];
            this.new = false;
        });
        if (this.route.snapshot.paramMap.get('id')) {
            this.choiceId = this.route.snapshot.paramMap.get('id');
            this.loadChoice(this.choiceId);
        } else {
            this.new = true;
            this.choice = new Choice().emptyChoice();
            this.loading = false;
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadChoice(id: string): void {
        this.service.getChoiceListById(id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                this.choice = response;
                this.values = this.choice.values;
                this.dataSource = new MatTableDataSource(this.values);
                this.loading = false;
                this.fieldsDisabled = false;
            });
    }


    deleteValue(element): void {
        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i] === element) {
                this.values.splice(i, 1);
                this.choice.values = this.values;
                this.service.updateChoice(this.choice)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(response => {
                        this.ngOnInit();
                    });
            }
        }
    }

    addValues(): void {
        this.value = new ChoiceValue().emptyChoiceValue();
        this.openDialog(this.value, true);
    }

    editValues(element): void {
        this.openDialog(element, false);
    }

    openDialog(element: ChoiceValue, newValue: boolean): void {
        const dialogRef = this.dialog.open(ChoiceValueAddEditComponent, {
            panelClass: 'app-choice-value-add-edit',
            data: {
                choiceValue: element,
                choice: this.choice,
                newValue: newValue
            }
        });
        dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                this.choice.values = this.values;
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':
                        console.log('save', formData.getRawValue());
                        for (let i = 0; i < this.choice.values.length; i++) {
                            if (this.choice.values[i].code.toLocaleLowerCase() === formData.getRawValue().code.toLocaleLowerCase()) {
                                this.choice.values[i] = formData.getRawValue();
                                break;
                            }
                        }
                        this.service.updateChoice(this.choice)
                            .pipe(takeUntil(this._unsubscribeAll))
                            .subscribe(res => {
                                this.loadChoice(this.choiceId);
                            });
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        console.log('delete', formData.getRawValue());
                        for (let i = 0; i < this.choice.values.length; i++) {
                            if (this.choice.values[i].code.toLocaleLowerCase() === formData.getRawValue().code.toLocaleLowerCase()) {
                                this.choice.values.splice(i, 1);
                                break;
                            }
                        }
                        this.service.updateChoice(this.choice)
                            .pipe(takeUntil(this._unsubscribeAll))
                            .subscribe(res => {
                                this.loadChoice(this.choiceId);
                            });
                        break;
                    /**
                     * Add
                     */
                    case 'add':
                        console.log('add', formData.getRawValue());
                        this.choice.values.push(formData.getRawValue());
                        this.service.createChoice(this.choice)
                            .pipe(takeUntil(this._unsubscribeAll))
                            .subscribe(res => {
                                this.loadChoice(this.choiceId);

                            });
                        break;
                }
                console.log('The dialog was closed', response);
            });
    }

    addChoice(): void {
        this.choice.values = this.values;
        if (this.new) {
            this.service.createChoice(this.choice)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(response => {
                });
        } else {
            this.service.updateChoice(this.choice)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(response => {
                });
        }
    }

    trackById(index, item): any {
        return item.id;
    }

}
