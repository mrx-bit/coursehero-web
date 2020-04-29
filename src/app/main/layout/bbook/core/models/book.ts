import {Audience} from './audience';

export class Book {
    id: string;
    code: string;
    logoId: string;
    soon: boolean;
    name: string;
    names: any;
    description: string;
    descriptions: any;
    audience: Audience;
    category: string;
    language: string;
    authors: string[];
    publisher: string;
    cityPublished: string;
    releaseDate: any;
    imageId: any;
    version: number;
    countAccess: number;
    state = 1;

    constructor() {
        this.initBook();
    }

    initBook(): void {
        this.code = '';
        this.name = '';
        this.imageId = '';
        this.logoId = '';
        this.description = '';
        this.audience = new Audience();
        this.countAccess = 20;
        this.category = '';
        this.language = '';
        this.authors = [];
        this.publisher = '';
        this.cityPublished = '';
        this.releaseDate = '';
        this.soon = false;
    }

}
