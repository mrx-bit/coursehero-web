export class Choice {

    id?: string;
    code?: string;
    nameKz?: string;
    nameRu?: string;
    nameEn?: string;
    descriptionKz?: string;
    descriptionRu?: string;
    descriptionEn?: string;
    values?: ChoiceValue[];

    constructor() {
    }

    emptyChoice(): Choice {
        const ch = new Choice;
        ch.code = '';
        ch.nameKz = '';
        ch.nameRu = '';
        ch.nameEn = '';
        ch.descriptionKz = '';
        ch.descriptionRu = '';
        ch.descriptionEn = '';
        return ch;
    }

}


export class ChoiceValue {
    name?: string;
    code?: string;
    displayNameRu?: string;
    displayNameEn?: string;
    displayNameKz?: string;

    constructor() {
    }

    emptyChoiceValue(): ChoiceValue {
        const cv = new ChoiceValue();
        cv.name = '';
        cv.code = '';
        cv.displayNameRu = '';
        cv.displayNameEn = '';
        cv.displayNameKz = '';
        return cv;
    }
}
