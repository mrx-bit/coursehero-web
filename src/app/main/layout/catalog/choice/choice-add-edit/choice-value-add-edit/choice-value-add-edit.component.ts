import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Choice, ChoiceValue} from '../../model/choice';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-choice-value-add-edit',
    templateUrl: './choice-value-add-edit.component.html',
    styleUrls: ['./choice-value-add-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChoiceValueAddEditComponent implements OnInit, OnDestroy {

    choice = new Choice();
    value = new ChoiceValue();
    msgs: string;
    choiceValueForm: FormGroup;
    newValue: boolean;
    dialogTitle: string;

    private _unsubscribeAll: Subject<any>;

    constructor(
        public dialogRef: MatDialogRef<ChoiceValueAddEditComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {
            choiceValue: ChoiceValue,
            choice: Choice,
            newValue: boolean
        }) {
        this.newValue = data.newValue;
        this.choice = data.choice;
        this.value = this.data.choiceValue;
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        if (this.newValue) {
            this.dialogTitle = 'Новое значение справочника';
        } else {
            this.dialogTitle = 'Редактировать справочника';
        }
        this.choiceValueForm = this.createChoiceValueForm();

    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    saveValues(): any {
        this.value = this.choiceValueForm.getRawValue();
        console.log('this.value', this.value);
        console.log('this.choiceValueForm.getRawValue()', this.choiceValueForm.getRawValue());
        if (!this.newValue) {
            for (let i = 0; i < this.choice.values.length; i++) {
                if (this.choice.values[i].code.toLocaleLowerCase() === this.value.code.toLocaleLowerCase()) {
                    this.choice.values[i] = this.value;
                }
            }
        } else {
            let check = false;
            if (this.choice.values !== undefined) {
                for (let i = 0; i < this.choice.values.length; i++) {
                    if (this.choice.values[i].code.toLocaleLowerCase() === this.value.code.toLocaleLowerCase()) {
                        this.msgs = 'Error, dont  code';

                        check = true;
                    }
                }
            } else {
                this.choice.values = [];
            }

            if (!check) {


                this.dialogRef.close(['add', this.choiceValueForm]);
            } else {
                this.dialogRef.close();
            }
        }
    }

    createChoiceValueForm(): FormGroup {
        return this._formBuilder.group({
            code: [
                {
                    value: this.value.code,
                    disabled: this.newValue === false
                }
            ],
            name: [this.value.name],
            displayNameRu: [this.value.displayNameRu],
            displayNameEn: [this.value.displayNameEn],
            displayNameKz: [this.value.displayNameKz],
        });
    }

}
