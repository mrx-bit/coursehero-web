export class Content {
    id: string;
    tittle: string;
    parentId: string;
    description: string;
    pageId: string;
    bookId: string;

    constructor() {
        this.bookId = '';
        this.tittle = '';
        this.parentId = '';
        this.description = '';
        this.pageId = '';
    }
}
