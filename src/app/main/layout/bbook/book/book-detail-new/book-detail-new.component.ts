import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fadeInAnimation} from '../../../../../core/route-animation/route.animation';
import {PageTitleService} from '../../../../../core/page-title/page-title.service';
import {Book2Service} from '../../core/services/book2.service';
import {Book} from '../../core/models/book';
import {MatTabChangeEvent} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-book-detail-new',
    templateUrl: './book-detail-new.component.html',
    styleUrls: ['./book-detail-new.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})
export class BookDetailNewComponent implements OnInit {
    book: any;
    status = 'edit';
    index = 0;
    constructor(
        private _route: ActivatedRoute,
        private pageTitleService: PageTitleService,
        private _bookService: Book2Service,
    ) {
    }

    ngOnInit(): void {
        this.pageTitleService.setTitle('Tabs');
        this._route.params.subscribe(params => {
            this.index = +params['step'];
            console.log('index', this.index);
        });
        this._bookService.onBookChanged
            .subscribe(book => {
                if (book.status === 'success') {
                    if (book.data === undefined || book.data === null) {
                        console.log('Class: BookComponent, Function: ngOnInit, Line 71 (): ');
                        this.status = 'new';
                        this.book = new Book();
                    } else {
                        this.book = book.data;
                    }
                } else {
                    console.error('Class: BookComponent, Function: ngOnInit, Line 73 (): Error during fetching book');
                }

            });
    }

    selectedTabChange(event: MatTabChangeEvent) {
        console.log('event', event);
        this.index = event.index;
    }
}
