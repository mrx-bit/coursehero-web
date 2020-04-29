import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Book2Service} from '../../core/services/book2.service';
import {Book} from '../../core/models/book';
import {BookStepsConstant} from '../../core/constants/book-steps.constant';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {FusePerfectScrollbarDirective} from '../../../../../../@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {FuseSidebarService} from '../../../../../../@fuse/components/sidebar/sidebar.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'bilgen-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookComponent implements OnInit, OnDestroy, AfterViewInit {
    bookSteps = BookStepsConstant.BOOKS_STEPS;
    totalSteps = this.bookSteps.length;
    animationDirection: 'left' | 'right' | 'none';
    book: any;
    bookStepContent: any;
    currentStep: number;
    status = 'edit';

    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor(
        private _bookService: Book2Service,
        private _fuseSidebarService: FuseSidebarService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        // Set the defaults
        this.animationDirection = 'none';

        this.currentStep = this._bookService.onStepChanged.getValue();
        console.log('Class: BookComponent, Function: constructor, Line 51 currentStep(): ', this.currentStep);
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        console.log('Class: BookComponent, Function: ngOnInit, Line 67 this.currentStep(): ', this.currentStep);
        // Subscribe to book
        this._bookService.onBookChanged
            .pipe(takeUntil(this._unsubscribeAll))
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

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        this.bookStepContent = this.fuseScrollbarDirectives.find((fuseScrollbarDirective) => {
            return fuseScrollbarDirective.elementRef.nativeElement.id === 'book-step-content';
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Go to step
     *
     * @param step
     */
    gotoStep(step): void {
        // Decide the animation direction
        this.animationDirection = this.currentStep < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Set the current step
        this.currentStep = step;
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        if (this.currentStep === this.book.totalSteps - 1) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'left';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Increase the current step
        this.currentStep++;
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        if (this.currentStep === 0) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Decrease the current step
        this.currentStep--;
    }

    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

}
