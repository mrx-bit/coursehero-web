import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import * as _moment from 'moment';
import {BookService} from '../../../core/services/book.service';
import {ChoiceListService} from '../../../core/services/choice-list.service';
import {Book} from '../../../core/models/book';
import {Audience} from '../../../core/models/audience';
import {Router} from '@angular/router';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {fuseAnimations} from '../../../../../../../@fuse/animations';
import {AidarService} from '../../../core/services/aidar.service';
import {ServiceCommonConstant} from '../../../../../../core/constant/service-common.constant';
import {Journal} from '../../../core/models/journal';
import {JournalService} from '../../../core/services/journal.service';

const moment = _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'book-info',
    templateUrl: './book-info.component.html',
    styleUrls: ['./book-info.component.scss'],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations

})
export class BookInfoComponent implements OnInit {

    @Input() book: Book;
    @Input() pageType: string;
    @Output() savedBook = new EventEmitter<any>();
    accept = '*';
    bookForm: FormGroup;
    categoryList: any;
    cityList: any;
    languageList: any;
    authorList = [];
    audience: Audience;
    date = new FormControl(moment());
    fileToUpload: any;
    codeRigth: boolean;
    text: string;
    baseUrl = ServiceCommonConstant.bbookModuleUrl;
    journal: Journal;
    version = true;

    constructor(
        private _formBuilder: FormBuilder,
        private _bookService: BookService,
        private _serviceAidar: AidarService,
        private _choiceService: ChoiceListService,
        private _matSnackBar: MatSnackBar,
        private _serviceJournal: JournalService,
        private router: Router
    ) {
        // if (this.book.names === undefined || this.book.names === null) {
        //     this.book.names = {kz: '', ru: '', en: ''};
        //     console.log('names', this.book.names);
        // }
        //
        // if (this.book.descriptions === undefined || this.book.descriptions === null) {
        //     this.book.descriptions = {kz: '', ru: '', en: ''};
        //     console.log('names', this.book.descriptions);
        // }
    }

    ngOnInit(): void {
        this.resetForm();
        this.getChoiceLists();
        this.getVersion();
    }


    resetForm(): void {

        if (this.book.names === undefined || this.book.names === null) {
            this.book.names = {kz: '', ru: '', en: ''};
            console.log('names', this.book.names);
        }

        if (this.book.descriptions === undefined || this.book.descriptions === null) {
            this.book.descriptions = {kz: '', ru: '', en: ''};
            console.log('names', this.book.descriptions);
        }

        this.bookForm = this.createForm();
        this.authorList = this.bookForm.get('authors').value;
        this.audience = this.bookForm.get('audience').value;
    }

    addFile(): void {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
            if (fileUpload.files && fileUpload.files[0]) {
                this.fileToUpload = fileUpload.files[0];
                this.uploadFile();

            }
        };

        fileUpload.click();
    }

    addFile2(): void {
        const fileUpload = document.getElementById('fileUpload2') as HTMLInputElement;
        fileUpload.onchange = () => {
            if (fileUpload.files && fileUpload.files[0]) {
                this.fileToUpload = fileUpload.files[0];
                this.uploadFile2();

            }
        };

        fileUpload.click();
    }

    uploadFile(): void {
        this._serviceAidar.uploadFile(this.upload()).subscribe(res => {
            console.log(this.bookForm.getRawValue());
            if (this.bookForm.getRawValue().imageId) {
                this.deleteFile(this.bookForm.getRawValue().imageId);
            }
            this.bookForm.controls['imageId'].setValue(res);
        });
    }

    uploadFile2(): void {
        this._serviceAidar.uploadFile(this.upload()).subscribe(res => {
            console.log(this.bookForm.getRawValue());
            if (this.bookForm.getRawValue().imageId) {
                this.deleteFile(this.bookForm.getRawValue().imageId);
            }
            this.bookForm.controls['logoId'].setValue(res);
        });
    }

    deleteFile(id): void {
        console.log('ts');
        this._serviceAidar.deleteFile(id)
            .pipe()
            .subscribe(response => {
                this.update();
            });
    }

    upload(): FormData {
        const input = new FormData();
        input.append('file', this.fileToUpload);
        return input;
    }

    createForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.book.id],
            code: [{value: this.book.code, disabled: this.pageType === 'edit'}],
            name: [this.book.name],
            nameKz: [this.book.names.kz],
            nameRu: [this.book.names.ru],
            nameEn: [this.book.names.en],
            description: [this.book.description],
            descriptionKz: [this.book.descriptions.kz],
            descriptionRu: [this.book.descriptions.ru],
            descriptionEn: [this.book.descriptions.en],
            audience: [this.book.audience],
            logoId: [this.book.logoId],
            soon: [this.book.soon],
            category: [this.book.category],
            language: [this.book.language],
            countAccess: [this.book.countAccess],
            imageId: [this.book.imageId],
            version: [this.book.version],
            authors: [this.book.authors],
            publisher: [this.book.publisher],
            cityPublished: [this.book.cityPublished],
            releaseDate: [(this.book.releaseDate !== undefined && this.book.releaseDate !== null ?
                new Date(this.book.releaseDate.year, this.book.releaseDate.month - 1, this.book.releaseDate.day + 1) :
                this.book.releaseDate)],
            state: [this.book.state]
        });
    }

    getChoiceLists(): void {
        // Fetching category lists from choice list
        this._choiceService.getCategories().subscribe(response => {
            this.categoryList = response.values;
        }, err => {
            console.error('Error while fetching getCategories [getAll()]');
        });

        // Fetching city lists from choice list
        this._choiceService.getCities().subscribe(response => {
            this.cityList = response.values;
        }, err => {
            console.error('Error while fetching getCities [getAll()]');
        });

        // Fetching language lists from choice list
        this._choiceService.getLanguages().subscribe(response => {
            this.languageList = response.values;
        }, err => {
            console.error('Error while fetching getLanguages [getAll()]');
        });
    }

    createRange(number): any {
        const items: number[] = [];
        for (let i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }

    addAuthor(): void {
        this.authorList.push('');
    }

    deleteAuthor(item): void {
        if (this.authorList.indexOf(item) !== -1) {
            this.authorList.splice(this.authorList.indexOf(item), 1);
        }
    }

    setAuthor(i, event): void {
        this.authorList[i] = event.srcElement.value;
        this.bookForm.patchValue({'authors': this.authorList});
    }

    create(): void {
        const form = this.bookForm.getRawValue();
        this.book = this.bookForm.getRawValue();

        if (this.book.names === undefined || this.book.names === null) {
            this.book.names = {kz: '', ru: '', en: ''};
            console.log('names', this.book.names);
        }

        if (this.book.descriptions === undefined || this.book.descriptions === null) {
            this.book.descriptions = {kz: '', ru: '', en: ''};
            console.log('names', this.book.descriptions);
        }

        this.book.names.kz = form.nameKz;
        this.book.names.ru = form.nameRu;
        this.book.names.en = form.nameEn;
        this.book.descriptions.kz = form.descriptionKz;
        this.book.descriptions.ru = form.descriptionRu;
        this.book.descriptions.en = form.descriptionEn;
        this._bookService.create(this.book).subscribe(response => {
            if (!(this.book.code).includes('@')) {
                this.book = response;
                this.savedBook.emit(this.book);
                this.resetForm();
                this.notification(response.name + ' добавлено успешно');
                this.pageType = 'edit';
            }
        });
    }

    update(): void {
        const form = this.bookForm.getRawValue();
        this.book = this.bookForm.getRawValue();

        if (this.book.names === undefined || this.book.names === null) {
            this.book.names = {kz: '', ru: '', en: ''};
            console.log('names', this.book.names);
        }

        if (this.book.descriptions === undefined || this.book.descriptions === null) {
            this.book.descriptions = {kz: '', ru: '', en: ''};
            console.log('names', this.book.descriptions);
        }

        this.book.names.kz = form.nameKz;
        this.book.names.ru = form.nameRu;
        this.book.names.en = form.nameEn;
        this.book.descriptions.kz = form.descriptionKz;
        this.book.descriptions.ru = form.descriptionRu;
        this.book.descriptions.en = form.descriptionEn;
        this._bookService.update(this.book).subscribe(response => {
            if (!(this.book.code).includes('@')) {
                this.book = response;
                this.resetForm();
                this.notification('Данные ' + response.name + ' успешно изменены');
                this.pageType = 'edit';
            }
        });
    }


    getVersion(): void {
        this._serviceJournal.getJournalVersionByBookId(this.book.id).subscribe(response => {
            this.journal = response;
        });
    }

    disable(data): void {
        this._bookService.disable(data.id).subscribe(response => {
            this.notification('Глава редактивирована успешно');
            this.router.navigate(['/bbook/books']);
        }, err => {
            console.error('Error while deleting template [deleteTemplate()]');
        });
    }

    notification(message): void {
        // Show the success message
        this._matSnackBar.open(message, 'OK', <MatSnackBarConfig>{
            verticalPosition: 'bottom',
            duration: 2000
        });
    }

    UpdateVersion() {
        this._bookService.updateVersion(this.book.id).subscribe(response => {
            this.version = false;
        }, err => {
            console.error('Error while deleting template [deleteTemplate()]');
        });
    }
}
