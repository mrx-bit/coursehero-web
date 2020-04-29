import {TestWidgetVariant} from './testWidgetVariant';

export class TestWidget {
    widgetContentTemplateType: string;
    questionText: string;
    questionTextFont: string;
    questionTextFontSize: number;
    questionPhotoId: string;
    questionPhotoPositionType: string;
    questionAudioId: string;
    runType: string;
    runButtonPosition: string;
    questionType: string;
    variantCount: number;
    variants: TestWidgetVariant[] = [];

}