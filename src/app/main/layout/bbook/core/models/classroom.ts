import {AcceptStudents} from './acceptStudents';

export class Classroom {
    id: string;
    bookId: string;
    teacherId: string;
    countAccessStudent: number;
    bookAccess: Boolean;
    countAcceptStudents: number;
    students: AcceptStudents[] = [];
    startDate: Date;
    endDate: Date;
    state = 1;

    constructor() {
        this.bookId = '';
        this.teacherId = '';
        this.bookAccess = false;
    }
}
