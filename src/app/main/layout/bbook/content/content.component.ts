import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../../../core/route-animation/route.animation';
import {PageTitleService} from '../../../../core/page-title/page-title.service';
import {TranslateService} from '@ngx-translate/core';
import {CoreService} from './core.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentService} from '../core/services/content.service';
import {Content} from '../core/models/content';
import {ContentTree} from '../core/models/contentTree';
import {PageService} from '../core/services/page.service';
import {Page} from '../core/models/page';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})
export class ContentComponent implements OnInit {

    contentTree: ContentTree[];
    bookid: any;
    id: any;
    projectContent: any;
    subscription: any;
    pages: Page[];

    constructor(private router: Router,
                private coreService: CoreService,
                private pageTitleService: PageTitleService,
                private translate: TranslateService,
                private route: ActivatedRoute,
                private _service: ContentService,
                private _servicePage: PageService) {
    }

    ngOnInit() {

        this.subscription = this.route.params
            .subscribe((params) => {
                this.bookid = params['bookId'];
                this.getPagesData()
                this.getAllContentTree(this.bookid);

            });
        this.pageTitleService.setTitle('Content');
        this.showProjectData();
    }

    projectDetails(content) {

        const first = location.pathname.split('/')[1];
        if (first === 'horizontal') {
            this.router.navigate(['/horizontal/crm/project-detail', content.id]);
            this.coreService.projectDetailsContent = content;
        } else {
            this.router.navigate(['/crm/project-detail', content.id]);
            this.coreService.projectDetailsContent = content;
        }
    }

    showProjectData() {
        this.coreService.getProjectContent().subscribe(res => {
                this.projectContent = res
            },
            err => console.log(err),
        );

    }

    getPagesData() {
        this._servicePage.getAllByBookId(this.bookid).subscribe(res => {
                this.pages = res
            },
            err => console.log(err),
        );

    }

    getPageName(id): any {
        for (let i = 0; i < this.pages.length; i++) {
            if (id === this.pages[i].id) {
                return this.pages[i].number;
            }
        }
    }

    getAllContentTree(id): void {
        this._service.getTreeByBookId(id).subscribe(response => {
            this.contentTree = response;
        }, err => {
            console.error(err);
        });
    }

}
