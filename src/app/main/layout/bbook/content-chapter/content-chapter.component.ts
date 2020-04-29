import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageTitleService} from '../../../../core/page-title/page-title.service';
import {TranslateService} from '@ngx-translate/core';
import {fadeInAnimation} from '../../../../core/route-animation/route.animation';
import {Aidar} from '../core/models/aidar';
import {AidarService} from '../core/services/aidar.service';
import {ActivatedRoute} from '@angular/router';
import {ServiceCommonConstant} from '../../../../core/constant/service-common.constant';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-content-chapter',
    templateUrl: './content-chapter.component.html',
    styleUrls: ['./content-chapter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})
export class ContentChapterComponent implements OnInit {

    aidars: Aidar[];
    videoAidars: Aidar[] = [];
    subscription: any;
    contentId: any;
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    windowHeight: number;
    windowWidth: number;

    isMobile = false;
    isIpad = false;
    isIpadPro = false;

    constructor(
        private pageTitleService: PageTitleService,
        private translate: TranslateService,
        private route: ActivatedRoute,
        private _service: AidarService
    ) {

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
                this.contentId = params['contentId'];
                this.getAllByContentId(this.contentId);
            });
        this.pageTitleService.setTitle('GalleryV2');
    }

    getAllByContentId(id): void {
        this._service.getAllByContentId(id).pipe().subscribe(response => {
            this.aidars = response;
            this.aidars.forEach(aidar => {
                if (aidar && (aidar.aidarType === 'videoAidar' || aidar.aidarType === 'talkingPhoto' ||
                    aidar.aidarType === 'letter' || aidar.aidarType === 'writeWorld')) {
                    this.videoAidars.push(aidar);
                }
            });
            console.log('----------------------------------------------------------');
            console.log(this.aidars);
        });
    }

}
