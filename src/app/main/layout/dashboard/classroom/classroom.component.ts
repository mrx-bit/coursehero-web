import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Classroom} from '../../bbook/core/models/classroom';
import {ClassroomService} from '../../bbook/core/services/classroom.service';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../bbook/core/models/book';
import {BookService} from '../../bbook/core/services/book.service';
import {ApplicationBook} from '../../bbook/core/models/applicationBook';
import {ApplicationBookService} from '../../bbook/core/services/application-book.service';

@Component({
    selector: 'app-classroom',
    templateUrl: './classroom.component.html',
    styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

    classroom: Classroom;
    bookid: any;
    text = '';
    error = false;
    idn = '';
    subscription: any;
    book: Book;
    description: any;
    applicationBook: ApplicationBook = new ApplicationBook();

    constructor(private _formBuilder: FormBuilder,
                private _clasroomSservice: ClassroomService,
                private _serviceApplicationBook: ApplicationBookService,
                private _serviceBook: BookService,
                private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params
            .subscribe((params) => {
                this.bookid = params['bookId'];
                this.getBook()
                this.getClassroomByBookId();
            });
    }

    getClassroomByBookId(): void {
        this._clasroomSservice.getClassroomByBookId(this.bookid).pipe().subscribe(res => {
            this.classroom = res;
            this.applicationBook.classRoomId = this.classroom.id;
            this.applicationBook.bookId = this.classroom.bookId;
        })
    }

    getBook(): void {
        this._serviceBook.getById(this.bookid).pipe().subscribe(res => {
            console.log('87rewer', res);
            this.book = res;
        })
    }

    registerStudent(idn): void {
        console.log('reasd');
        this._clasroomSservice.sendStudent(this.classroom.id, idn).subscribe(res => {
            console.log(res);
            if (res.status === true) {
                this.error = false;
                this.getClassroomByBookId();
            } else {
                this.error = true;
                this.text = res.text;
            }
        });
    }

    getAccess(): void {
        this._serviceApplicationBook.create(this.applicationBook).subscribe(res => {
        });
    }
}
