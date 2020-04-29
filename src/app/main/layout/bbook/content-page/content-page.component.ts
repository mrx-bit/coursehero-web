import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef, OnDestroy, ViewChild} from '@angular/core';
import {PageTitleService} from '../../../../core/page-title/page-title.service';
import {TranslateService} from '@ngx-translate/core';
import {CoreService} from '../../../../service/core/core.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AidarService} from '../core/services/aidar.service';
import {Aidar} from '../core/models/aidar';
import {ServiceCommonConstant} from '../../../../core/constant/service-common.constant';
import {AidarComment} from '../core/models/aidar-comment';
import {User} from '../../../../core/model/alippe/user';
import {BooksService} from '../core/services/books.service';
import {Book} from '../core/models/book';
import {BookService} from '../core/services/book.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-content-page',
    templateUrl: './content-page.component.html',
    styleUrls: ['./content-page.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class ContentPageComponent implements OnInit, OnDestroy {
    subscription: any;
    aidarId: any;
    baseUrl = ServiceCommonConstant.bbookModuleUrl;
    aidar: Aidar;
    aidarComments: AidarComment[] = [];
    aidarComment: AidarComment;
    user: User;
    text = '';
    book: Book;

    sidenavAidarList: Aidar[] = [];
    initialAidarList: Aidar[] = [];

    mobileQuery: MediaQueryList;

    searchString: string;

    private _mobileQueryListener: () => void;
    private _unsubscribeAll: Subject<any>;


    @ViewChild('snav', {static: false}) sidenav: MatSidenav;

    constructor(
        private coreService: CoreService,
        private translate: TranslateService,
        private route: ActivatedRoute,
        private router: Router,
        private _booksService: BookService,
        private _booksService1: BooksService,
        private _service: AidarService,
        private pageTitleService: PageTitleService,
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher
    ) {
        this.user = JSON.parse(localStorage.getItem('user'));

        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        this._unsubscribeAll  = new Subject();

    }

    ngOnInit() {
        this.subscription = this.route.params
            .subscribe((params) => {
                if (this.aidarId === undefined || this.aidarId === null) {
                    this.aidarId = params['aidarId'];
                }
                this.getAidarById(this.aidarId);
                this.getAllComment();
            });
        this.pageTitleService.setTitle('Payment');
        this.getBookByBookId();
        console.log('Class: ContentPageComponent, >>> >> >: ', this.aidar);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getAidarById(id): void {
        this._service.getById(id).pipe().subscribe(response => {
            this.aidar = response;
            this.getAidarsByType(this.aidar.aidarType, this.aidar.id);
            console.log('Class: ContentPageComponent, >>> >> >: ', this.aidar);
        });
    }

    getAidarsByType(type: string, currentAidarId: string): void {
        this._service.getAllByAidarTypeAndIdIsNot(type, currentAidarId).subscribe((res) => {
            this.sidenavAidarList = res;
            this.initialAidarList = res;
        });
    }

    getBookByBookId() {
        this._booksService.getById(localStorage.getItem('bookId')).pipe().subscribe(res => {
            this.book = res;
        })
    }

    check(): void {
        if (this.searchString.length === 0) {
            this.sidenavAidarList = this.initialAidarList;
        }
    }

    search(): void {
        if (this.searchString.length > 0) {
            this._service.searchByAidarTypeAndBookId(this.aidar.aidarType, this.aidar.bookId, this.searchString)
                .pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.sidenavAidarList = res;
            })
        } else {
            this.sidenavAidarList = this.initialAidarList;
        }
    }

    redirect(aidarId: string) {
        console.log('redirect: ' + aidarId);
        this.aidarId = aidarId;
        this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/app/bbook/content-page/' + aidarId]);
        });
    }

    setComment(): void {
        if (this.text !== '') {
            this.aidarComment = new AidarComment();
            this.aidarComment.aidarId = this.aidarId;
            this.aidarComment.comment = this.text;
            this._service.createComment(this.aidarComment).pipe().subscribe(response => {
                this.aidarComments.push(response);
                this.text = '';
            });
        }
    }

    getAllComment(): void {
        this._service.getAllComment(this.aidarId).pipe().subscribe(response => {
            this.aidarComments = response;
        });
    }

    remove(id: string) {
        this._service.disableComment(id).pipe().subscribe(response => {
            for (let i = 0; i < this.aidarComments.length; i++) {
                if (this.aidarComments[i].id === id) {
                    this.aidarComments.splice(i, 1);
                    break;
                }
            }
        });
    }

}
