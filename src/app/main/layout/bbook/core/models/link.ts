export class Link {
    id: string;
    bookId: string;
    bookCode: string;
    parentId: string;
    hasParent = false;
    title: string;
    description: string;
    pageId: string;
    pageNumber: number;
    state = 1;

    constructor(bookId: any, bookCode: any, title?: any, description?: any){
        this.bookId = bookId;
        this.bookCode = bookCode;
        this.title = title || '';
        this.description = description || '';
    }
}
