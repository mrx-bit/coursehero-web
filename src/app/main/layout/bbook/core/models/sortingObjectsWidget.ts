import {SortingObjectWidgetBox} from './sortingObjectWidgetBox';
import {SortingObjectWidgetBoxItem} from './sortingObjectWidgetBoxItem';

export class SortingObjectsWidget {

    widgetContentTemplateType: string;
    gameMode: string;
    questionText: string;
    questionTextFont: string;
    questionTextFontSize: number;
    questionPhotoPositionType: string;
    questionPhotoId: string;
    questionAudioId: string;
    runType: string;
    runButtonPosition: string;
    boxTemplateType: string;
    boxCount: number;
    sortingObjectWidgetBoxList: SortingObjectWidgetBox[] = [];
    boxItemCount: number;
    sortingObjectWidgetBoxItemList: SortingObjectWidgetBoxItem[] = [];
    state = 1;

    constructor() {
    }
}