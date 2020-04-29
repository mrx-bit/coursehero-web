import {Component, OnInit} from '@angular/core';
import {AidarService} from '../../bbook/core/services/aidar.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Aidar} from '../../bbook/core/models/aidar';
import {ServiceCommonConstant} from '../../../../core/constant/service-common.constant';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-video-content',
    templateUrl: './video-content.component.html',
    styleUrls: ['./video-content.component.scss']
})
export class VideoContentComponent implements OnInit {
    private _unsubscribeAll: Subject<any>;
    aidar: Aidar[];
    baseUrl = ServiceCommonConstant.bbookModuleUrl;


    constructor
    (
        private _aidarService: AidarService
    ) {

        this._unsubscribeAll = new Subject();

    }

    ngOnInit(): void {
        this.getAllById();
    }


    getAllById(): void {
        this._aidarService.getAllByContentId(this.aidar)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(res => {
                this.aidar = res;
            })
    }
}
