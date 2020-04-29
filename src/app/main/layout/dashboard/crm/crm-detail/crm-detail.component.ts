import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../bbook/core/services/user.service';
import {User} from '../../../../../core/model/alippe/user';
import {Techer} from '../../../bbook/core/models/user/techer';
import {TeacherBooks} from '../../../bbook/core/models/user/teacherBook';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-crm-detail',
    templateUrl: './crm-detail.component.html',
    styleUrls: ['./crm-detail.component.scss']
})
export class CrmDetailComponent implements OnInit {
    user: User;
    teacherBook: Techer;
    bookCode = 'shopen';

    teacherBookCurrent = new TeacherBooks();

    constructor(private _service: UserService) {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit(): void {
        this.getByUserId();
        this.teacherBookCurrent.bookCode = this.bookCode;
    }

    getByUserId(): void {
        this._service.getById(this.user.id).subscribe(response => {
            this.teacherBook = response;
            for (let i = 0; i < this.teacherBook.teacherBooks.length; i++) {
                if (this.teacherBook.teacherBooks[i].bookCode === this.bookCode) {
                    this.teacherBookCurrent = this.teacherBook.teacherBooks[i];
                }
            }
            if (!this.teacherBookCurrent) {
            }
        }, err => {
            console.error(err);
        });
    }

    addIdn(): void {
        if (this.teacherBookCurrent.students.length < 20) {
            this.teacherBookCurrent.students.push('');
        }
    }
}
