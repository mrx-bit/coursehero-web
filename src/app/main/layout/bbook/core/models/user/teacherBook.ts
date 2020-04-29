export class TeacherBooks {
    bookCode: any;
    access: boolean;
    students: string[];
    booksPromoCode: string[];

    constructor() {
        this.bookCode = '';
        this.access = false;
        this.students = [];
        this.booksPromoCode = [];
    }
}
