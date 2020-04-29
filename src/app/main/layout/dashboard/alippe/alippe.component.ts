import {Component, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {AidarService} from '../../bbook/core/services/aidar.service';
import {Subject} from 'rxjs';
import {ServiceCommonConstant} from '../../../../core/constant/service-common.constant';
import {Aidar} from '../../bbook/core/models/aidar';
import {ActivatedRoute} from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-alippe',
    templateUrl: './alippe.component.html',
    styleUrls: ['./alippe.component.scss']
})
export class AlippeComponent implements OnInit {
    private _unsubscribeAll: Subject<any>;
    bookId: any;
    aidarCode: any;
    aidars: Aidar[] = [];
    contentId: any;
    baseUrl = ServiceCommonConstant.bbookModuleUrl;
    subscription: any;

    windowHeight: number;
    windowWidth: number;

    isMobile = false;
    isIpad = false;
    isIpadPro = false;

    constructor(
        private _aidarService: AidarService,
        private route: ActivatedRoute,
    ) {
        this._unsubscribeAll = new Subject();

        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;

        if (this.windowWidth < 750 && this.windowHeight < 900) {
            this.isMobile = true;
        } else if (this.windowWidth < 800 && this.windowHeight < 1030) {
            this.isIpad = true;
        } else if (this.windowWidth < 1030 && this.windowHeight < 1370) {
            this.isIpadPro = true;
        }
    }

    ngOnInit() {
        this.subscription = this.route.params
            .subscribe((params) => {
                this.bookId = localStorage.getItem('bookId');
                if (params['code']) {
                    this.aidarCode = params['code'];
                    this.getAidarByType();
                } else if (params['content']) {
                    this.contentId = params['content']
                    this.getAidarByContent();
                }
            });
    }

    getAidarByType() {
        this._aidarService.getAidarByType(this.bookId, this.aidarCode).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.aidars = res.data;
        });
    }

    getAidarByContent() {
        this._aidarService.getAllByContentId(this.contentId).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.aidars = res;
        });
    }
}
