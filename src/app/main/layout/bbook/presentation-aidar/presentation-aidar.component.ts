import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {BookService} from '../core/services/book.service';
import {takeUntil} from 'rxjs/operators';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-presentation-aidar',
    templateUrl: './presentation-aidar.component.html',
    styleUrls: ['./presentation-aidar.component.scss'],
    animations: fuseAnimations
})
export class PresentationAidarComponent implements OnInit, OnDestroy {
    categories: any[];
    books: any[];
    booksFilteredByCategory: any[];
    filteredBooks: any[];
    currentCategory: string;
    searchTerm: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {BookService} _bookService
     */
    constructor(
        private _bookService: BookService
    ) {
        // Set the defaults
        this.currentCategory = 'all';
        this.searchTerm = '';

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
        // Subscribe to categories
        this._bookService.onCategoriesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(categories => {
                this.categories = categories.data.values;
            });

        // Subscribe to books
        this._bookService.onBooksChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(books => {
                console.log('Class: BooksComponent, Function: , Line 63 (): ', books);
                this.filteredBooks = this.booksFilteredByCategory = this.books = books.data;
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
     * Filter books by category
     */
    filterBooksByCategory(): void {
        // Filter
        if (this.currentCategory === 'all') {
            this.booksFilteredByCategory = this.books;
            this.filteredBooks = this.books;
        } else {
            this.booksFilteredByCategory = this.books.filter((book) => {
                return book.category === this.currentCategory;
            });

            this.filteredBooks = [...this.booksFilteredByCategory];

        }

        // Re-filter by search term
        this.filterBooksByTerm();
    }

    /**
     * Filter books by term
     */
    filterBooksByTerm(): void {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if (searchTerm === '') {
            this.filteredBooks = this.booksFilteredByCategory;
        } else {
            this.filteredBooks = this.booksFilteredByCategory.filter((book) => {
                return book.title.toLowerCase().includes(searchTerm);
            });
        }
    }

    add(): void {
        console.log('Class: BooksComponent, Function: add, Line 127 (): ');
    }
}
