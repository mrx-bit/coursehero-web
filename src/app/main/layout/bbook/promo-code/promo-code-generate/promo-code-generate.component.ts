import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Content} from '../../core/models/content';
import {Book} from '../../core/models/book';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-promo-code-generate',
    templateUrl: './promo-code-generate.component.html',
    styleUrls: ['./promo-code-generate.component.scss']
})
export class PromoCodeGenerateComponent implements OnInit {
    action: string;
    object: any;
    content: Content = new Content();
    dialogTitle: string;
    book: Book;
    countPromo = 0;

    constructor(
        @Inject(MAT_DIALOG_DATA) public _data: any,
        public matDialogRef: MatDialogRef<PromoCodeGenerateComponent>,
    ) {
        this.book = _data.object;
    }

    ngOnInit() {
    }
}
