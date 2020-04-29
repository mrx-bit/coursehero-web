export class Page {
    id: string;
    bookId: string;
    bookCode: string;
    number: number;
    description: string;
    state = 1;

    constructor(bookId: any, bookCode: any, number?: any, description?: any){
        this.bookId = bookId;
        this.bookCode = bookCode;
        this.number = number || '';
        this.description = description || '';
    }
}
