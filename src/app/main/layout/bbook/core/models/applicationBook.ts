export class ApplicationBook {
    id: string;
    teacherId: string;
    status: string;
    description: string;
    bookId: string;
    classRoomId: string;

    constructor() {
        this.teacherId = '';
        this.status = '';
        this.description = '';
        this.bookId = '';
        this.classRoomId = '';
    }
}
