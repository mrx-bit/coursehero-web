import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../../core/route-animation/route.animation';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-ms-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.scss'],
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})
export class ChildComponent implements OnInit, OnDestroy {

    subscription: any;
    private _unsubscribeAll: Subject<any>;

    constructor() {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
