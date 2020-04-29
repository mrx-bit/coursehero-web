import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-answer-dialog',
    templateUrl: './answer-dialog.component.html',
    styleUrls: ['./answer-dialog.component.scss']
})
export class AnswerDialogComponent implements OnInit {
    answer: boolean;

    constructor(
        public dialogRef: MatDialogRef<AnswerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any) {
        this.answer = _data.answer;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
    }
}
