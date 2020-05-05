import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-news-or-events-open',
    templateUrl: './news-or-events-open.component.html',
    styleUrls: ['./news-or-events-open.component.scss']
})
export class NewsOrEventsOpenComponent implements OnInit {
    comments = [1, 2, 3, 4, 5]

    constructor() {
    }

    ngOnInit() {
    }

}
