export class Audience {
    minAge: number;
    maxAge: number;

    constructor(minAge?: number, maxAge?: number){
        this.minAge = minAge || 7;
        this.maxAge = maxAge || 18;
    }
}
