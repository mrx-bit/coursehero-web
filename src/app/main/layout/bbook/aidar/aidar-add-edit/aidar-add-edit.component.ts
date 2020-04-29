import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Aidar} from '../../core/models/aidar';
import {AidarService} from '../../core/services/aidar.service';
import {ChoiceListService} from '../../core/services/choice-list.service';
import {TestWidgetVariant} from '../../core/models/testWidgetVariant';
import {SortingObjectWidgetBox} from '../../core/models/sortingObjectWidgetBox';
import {SortingObjectWidgetBoxItem} from '../../core/models/sortingObjectWidgetBoxItem';
import {Page} from '../../core/models/page';
import {Buyn} from '../../core/models/games/buyn';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef} from '@angular/material';
import {Match} from '../../core/models/games/match';
import {BoxSorting} from '../../core/models/games/boxSorting';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {SyllableLine} from '../../core/models/games/syllable-line';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContentService} from '../../core/services/content.service';
import {Content} from '../../core/models/content';
import {OddImages} from '../../core/models/games/oddImages';
import {AripTusy} from '../../core/models/games/pazzleBuynKizilKok';
import {variable} from '@angular/compiler/src/output/output_ast';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SaikestendirPhoto} from '../../core/models/games/saikestendirPhoto';
import {SozKura} from '../../core/models/games/soz-kura';
import {FormGroup} from '@angular/forms';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'e-commerce-product',
    templateUrl: './aidar-add-edit.component.html',
    styleUrls: ['./aidar-add-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AidarAddEditComponent implements OnInit, OnDestroy {
    pageType: string;
    // Private
    aidarTypeGames: any[] = [];
    aidarType: any[] = [];
    private _unsubscribeAll: Subject<any>;
    aidarId: any;
    aidar: Aidar = new Aidar();
    questionPhotoPositionTypes: any[] = [];
    testWidgetVariant: TestWidgetVariant = new TestWidgetVariant();
    sortingObjectWidgetBox: SortingObjectWidgetBox = new SortingObjectWidgetBox();
    sortingObjectWidgetBoxItem: SortingObjectWidgetBoxItem = new SortingObjectWidgetBoxItem();
    widgetContentTemplateTypes: any;
    runTypes: any[];
    selected: any;
    questionTypes: any[];
    accept = '*';
    boxTemplateTypes: any[];
    fileToUpload: any;
    filesToUpload: any[] = [];
    pages: Page[] = [];
    bookId: any;
    step = 3;
    visible = true;
    selectable = false;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    baseUrl = ServiceCommonConstant.bbookModuleUrl;
    contents: Content[] = [];

    nameLang = 1; // 1 - Kazakh, 2 - Russian, 3 - English
    descriptionLang = 1; // 1 - Kazakh, 2 - Russian, 3 - English

    artists = [
        'Artist I - Davido',
        'Artist II - Wizkid',
        'Artist III - Burna Boy',
        'Artist IV - Kiss Daniel',
        'Artist V - Mayorkun',
        'Artist VI - Mr. Eazi',
        'Artist VII - Tiwa Savage',
        'Artist VIII - Blaqbonez',
        'Artist IX - Banky W',
        'Artist X - Yemi Alade',
        'Artist XI - Perruzi',
        'Artist XII - Seyi Shay',
        'Artist XIII - Teni'
    ];

    alteArtists = [
        'Artist 1 - Odunsi',
        'Artist 2 - Nonso',
        'Artist 3 - Wavy the creator',
        'Artist 4 - Dwin',
        'Artist 5 - SDC',
        'Artist 6 - Teni'
    ];

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer !== event.container) {
            transferArrayItem(event.previousContainer.data, event.container.data,
                event.previousIndex, event.currentIndex)
        } else {
            moveItemInArray(this.aidar.saikestendirPhoto.leftSideImages, event.previousIndex, event.currentIndex);
        }
    }

    constructor(
        private _location: Location,
        private _serviceContent: ContentService,
        private _service: AidarService,
        private _serviceChoiceList: ChoiceListService,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        public matDialogRef: MatDialogRef<AidarAddEditComponent>,
    ) {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.bookId = this._data.bookId;
        if (this._data.type !== 'new') {
            this.pageType = 'edit';
            this.aidarId = this._data.aidarId;

            this.getAidar(this.aidarId);
            this.getContentByBook();
        } else {
            this.pageType = 'new';
            this.getContentByBook();
            this.getChoice();
        }

        // Subscribe to update product on changes
        this.aidar.find.letters = [];

        console.log('aidar', this.aidar);
        console.log('data', this._data);


        if (this.aidar.names === undefined || this.aidar.names === null) {
            this.aidar.names = {kz: '', ru: '', en: ''};
            console.log('names', this.aidar.names);
        }

        if (this.aidar.descriptions === undefined || this.aidar.descriptions === null) {
            this.aidar.descriptions = {kz: '', ru: '', en: ''};
            console.log('names', this.aidar.descriptions);
        }

        this.aidar.saikestendirPhoto = new SaikestendirPhoto();
        this.aidar.saikestendirPhoto.leftSideImages = [];
        this.aidar.saikestendirPhoto.rightSideImages = [];

        this.aidar.sozKura = new SozKura();

    }

    getContentByBook(): void {
        this._serviceContent.getAllByBook(this.bookId).subscribe(response => {
            this.contents = response;
            console.log('contents', this.contents);
        }, err => {
            console.error(err);
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    catchFieldValue($event: any, field: string): void {
        console.log($event)
        this.aidar[field] = ($event);
    }
    getChoice(): any {
        this.getTypes();
        // this.getTypesGames();
        this.getWidgetContentTemplateType();
        this.getQuestionPhotoPositionType();
        this.getRunTypes();
        this.getQuestionType();
        this.getBoxTemplateType();
    }

    getAidar(id): void {
        this._service.getById(id).pipe().subscribe(response => {
            this.aidar = response;

            if (this.aidar.names === undefined || this.aidar.names === null) {
                this.aidar.names = {kz: '', ru: '', en: ''};
                console.log('names', this.aidar.names);
            }

            if (this.aidar.descriptions === undefined || this.aidar.descriptions === null) {
                this.aidar.descriptions = {kz: '', ru: '', en: ''};
                console.log('names', this.aidar.descriptions);
            }

            console.log('type', this.aidar.type);
            console.log('aidarType', this.aidar.aidarType);
            if (this.aidar.find.letters === null || this.aidar.find.letters === undefined) {
                this.aidar.find.letters = [];
            }
            if (this.aidar.aidarType) {
                this.getTypesGames();
            }
            this.getChoice();
        });
    }


    getTypesGames(): void {
        this._serviceChoiceList.getChoice(this.aidar.aidarType)
            .pipe()
            .subscribe(response => {
                this.aidarTypeGames = response.values;
            });
    }

    getTypes(): void {
        this._serviceChoiceList.getChoice('realAidarType')
            .pipe()
            .subscribe(response => {
                this.aidarType = response.values;
            });
    }

    getBoxTemplateType(): void {
        this._serviceChoiceList.getChoice('boxTemplateType')
            .pipe()
            .subscribe(response => {
                this.boxTemplateTypes = response.values;
            });
    }

    getQuestionType(): void {
        this._serviceChoiceList.getChoice('questionType')
            .pipe()
            .subscribe(response => {
                this.questionTypes = response.values;
            });
    }

    getRunTypes(): void {
        this._serviceChoiceList.getChoice('runType')
            .pipe()
            .subscribe(response => {
                this.runTypes = response.values;
            });
    }

    getQuestionPhotoPositionType(): void {
        this._serviceChoiceList.getChoice('questionPhotoPositionType')
            .pipe()
            .subscribe(response => {
                this.questionPhotoPositionTypes = response.values;
            });
    }

    addFiles(link: string, index?: number): void {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
            if (fileUpload.files) {
                for (let i = 0; i < fileUpload.files.length; i++) {
                    this.filesToUpload[i] = fileUpload.files[i];
                    this.uploadFile(link, index);
                }
            }
        };
        fileUpload.click();
    }

    addFile(link: string, index?: number): void {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
            if (fileUpload.files && fileUpload.files[0]) {
                this.fileToUpload = fileUpload.files[0];
                this.uploadFile(link, index);

            }
        };

        fileUpload.click();
    }

    uploadFile(link, index: number): void {
        console.log(link);
        this._service.uploadFile(this.upload()).subscribe(res => {
            if (link === 'testWidget.questionPhotoId') {
                console.log(1);
                if (this.aidar.testWidget.questionPhotoId) {
                    this.deleteFile(this.aidar.testWidget.questionPhotoId);
                }
                this.aidar.testWidget.questionPhotoId = res;
            } else if (link === 'testWidget.questionAudioId') {
                console.log(2);

                if (this.aidar.testWidget.questionAudioId) {
                    this.deleteFile(this.aidar.testWidget.questionAudioId);
                }
                this.aidar.testWidget.questionAudioId = res;
            } else if (link === 'testWidget.variants.audioId') {
                console.log(3, '  ', index);

                if (this.aidar.testWidget.variants[index].audioId) {
                    this.deleteFile(this.aidar.testWidget.variants[index].audioId);
                }
                this.aidar.testWidget.variants[index].audioId = res;
            } else if (link === 'testWidget.variants.photoId') {
                if (this.aidar.testWidget.variants[index].photoId) {
                    this.deleteFile(this.aidar.testWidget.variants[index].photoId);
                }
                this.aidar.testWidget.variants[index].photoId = res;
            } else if (link === 'sortingObjectsWidget.questionPhotoId') {
                if (this.aidar.sortingObjectsWidget.questionPhotoId) {
                    this.deleteFile(this.aidar.sortingObjectsWidget.questionPhotoId);
                }
                this.aidar.sortingObjectsWidget.questionPhotoId = res;
            } else if (link === 'sortingObjectsWidget.questionAudioId') {
                if (this.aidar.sortingObjectsWidget.questionAudioId) {
                    this.deleteFile(this.aidar.sortingObjectsWidget.questionAudioId);
                }
                this.aidar.sortingObjectsWidget.questionAudioId = res;
            } else if (link === 'sortingObjectsWidget.sortingObjectWidgetBox.audioId') {
                if (this.aidar.sortingObjectsWidget.sortingObjectWidgetBoxList[index].audioId) {
                    this.deleteFile(this.aidar.sortingObjectsWidget.sortingObjectWidgetBoxList[index].audioId);
                }
                this.aidar.sortingObjectsWidget.sortingObjectWidgetBoxList[index].audioId = res;
            } else if (link === 'sortingObjectsWidget.sortingObjectWidgetBox.avatarId') {
                if (this.aidar.sortingObjectsWidget.sortingObjectWidgetBoxList[index].avatarId) {
                    this.deleteFile(this.aidar.sortingObjectsWidget.sortingObjectWidgetBoxList[index].avatarId);
                }
                this.aidar.sortingObjectsWidget.sortingObjectWidgetBoxList[index].avatarId = res;
            } else if (link === 'sortingObjectsWidget.sortingObjectWidgetBoxItem.avatarId') {
                if (this.aidar.sortingObjectsWidget.sortingObjectWidgetBoxItemList[index].avatarId) {
                    this.deleteFile(this.aidar.sortingObjectsWidget.sortingObjectWidgetBoxItemList[index].avatarId);
                }
                this.aidar.sortingObjectsWidget.sortingObjectWidgetBoxItemList[index].avatarId = res;
            } else if (link === 'aidar.buyn.imageId') {
                console.log(link);
                if (this.aidar.buyn[index].imageId) {
                    this.deleteFile(this.aidar.buyn[index].imageId);
                }
                this.aidar.buyn[index].imageId = res;
            } else if (link === 'aidar.match.imageId') {
                if (this.aidar.match[index].imageId) {
                    this.deleteFile(this.aidar.match[index].imageId);
                }
                this.aidar.match[index].imageId = res;
            } else if (link === 'aidar.pazzle.imageId') {
                if (this.aidar.pazzle.imageId) {
                    this.deleteFile(this.aidar.pazzle.imageId);
                }

                this.aidar.pazzle.imageId = res;
            } else if (link === 'aidar.pazzleBuyn.imageId') {
                if (this.aidar.pazzleBuyn.imageId) {
                    this.deleteFile(this.aidar.pazzleBuyn.imageId);
                }
            } else if (link === 'aidar') {
                if (this.aidar.imageId) {
                    this.deleteFile(this.aidar.imageId);
                }
                this.aidar.imageId = res;
            } else if (link === 'oddImages.image') {
                if (this.aidar.oddImages[index].imageId) {
                    this.deleteFile(this.aidar.oddImages[index].imageId);
                }
                this.aidar.oddImages[index].imageId = res;
            } else if (link === 'boxSorting.imageId') {
                if (this.aidar.boxSorting[index].imageId) {
                    this.deleteFile(this.aidar.boxSorting[index].imageId);
                }
                this.aidar.boxSorting[index].imageId = res;
            } else if (link === 'oddImagesText.image') {
                if (this.aidar.oddImagesText.oddImages[index].imageId) {
                    this.deleteFile(this.aidar.oddImagesText.oddImages[index].imageId);
                }
                this.aidar.oddImagesText.oddImages[index].imageId = res;
            } else if (link === 'oddImagesText.audio') {
                if (this.aidar.oddImagesText.oddImages[index].audioId) {
                    this.deleteFile(this.aidar.oddImagesText.oddImages[index].audioId);
                }
                this.aidar.oddImagesText.oddImages[index].audioId = res;
            } else if (link === 'oddImages.audio') {
                if (this.aidar.oddImages[index].audioId) {
                    this.deleteFile(this.aidar.oddImages[index].audioId);
                }
                this.aidar.oddImages[index].audioId = res;
            } else if (link === 'training.image') {
                if (this.aidar.training.imageId) {
                    this.deleteFile(this.aidar.training.imageId);
                }
                this.aidar.training.imageId = res;
            } else if (link === 'training.audio') {
                if (this.aidar.training.audioId) {
                    this.deleteFile(this.aidar.training.audioId);
                }
                this.aidar.training.audioId = res;
            } else if (link === 'training.videoId') {
                if (this.aidar.training.videoId) {
                    this.deleteFile(this.aidar.training.videoId);
                }
                this.aidar.training.videoId = res;
            } else if (link === 'aidar.videoAidar.videoId') {
                if (this.aidar.videoAidar.videoId) {
                    this.deleteFile(this.aidar.videoAidar.videoId);
                }
                this.aidar.videoAidar.videoId = res;
            } else if (link === 'oddImagesText.audioId') {
                if (this.aidar.oddImagesText.audioId) {
                    this.deleteFile(this.aidar.oddImagesText.audioId);
                }
                this.aidar.oddImagesText.audioId = res;
            } else if (link === 'aidar.background') {
                if (this.aidar.backgroundImageId) {
                    this.deleteFile(this.aidar.backgroundImageId);
                }
                this.aidar.backgroundImageId = res;
            } else if (link === 'aidar.taskAudio') {
                if (this.aidar.taskAudioId) {
                    this.deleteFile(this.aidar.taskAudioId);
                }
                this.aidar.taskAudioId = res;
            } else if (link === 'aidar.saikestendirPhoto.images') {
                this.aidar.saikestendirPhoto.leftSideImages.push(res)
            }
        });
    }

    deleteFile(id): void {
        console.log('ts');
        this._service.deleteFile(id)
            .pipe()
            .subscribe(response => {
                console.log('after service');
                if (this.pageType === 'edit') {
                    this.saveAidar();
                }
            });
    }

    upload(): FormData {
        const input = new FormData();
        input.append('file', this.fileToUpload);
        return input;
    }

    getWidgetContentTemplateType(): void {
        this._serviceChoiceList.getChoice('widgetContentTemplateType')
            .pipe()
            .subscribe(response => {
                this.widgetContentTemplateTypes = response.values;
            });
    }

    saveAidar(): void {
        console.log('Class: AidarAddEditComponent, Function: saveAidar, Line 274 (): Kirdi', this.aidar);
        this._service.update(this.aidar)
            .pipe()
            .subscribe(response => {
                this.aidar = response;
                console.log('Class: AidarAddEditComponent, Function: this.aidar, Line 278 (): ', this.aidar);
                this.pageType = 'edit';
            });
    }

    addAidar(): void {
        console.log('Class: AidarAddEditComponent, Function: saveAidar, Line 274 (): Kirdi 2 ', this.aidar);
        this._service.create(this.aidar)
            .pipe()
            .subscribe(response => {
                this.aidar = response;
                console.log('Class: AidarAddEditComponent, Function: this.aidar, Line 278 (): ', this.aidar);
                this.pageType = 'edit';

            });
    }

    addVariant(): void {
        this.aidar.testWidget.variants.push(this.testWidgetVariant);
    }

    addsortingObjectWidgetBox(): void {
        this.aidar.sortingObjectsWidget.sortingObjectWidgetBoxList.push(this.sortingObjectWidgetBox);
    }

    addOddImagesText(): void {
        this.aidar.oddImagesText.oddImages.push(new OddImages());
    }

    addOddImage(): void {
        this.aidar.oddImages.push(new OddImages());
        console.log(this.aidar.oddImages)
    }

    addsortingObjectWidgetBoxItem(): void {
        this.aidar.sortingObjectsWidget.sortingObjectWidgetBoxItemList.push(this.sortingObjectWidgetBoxItem);
    }

    addBuyn(): void {
        this.aidar.buyn.push(new Buyn());
        console.log(this.aidar.buyn);
    }

    addMatch(): void {
        this.aidar.match.push(new Match());
        console.log(this.aidar.buyn);
    }

    addBoxSorting(): void {
        this.aidar.boxSorting.push(new BoxSorting());
    }

    addSyllableLine(): void {
        this.aidar.syllableLine.push(new SyllableLine());
    }

    addSyllableConstructor(): void {
        this.aidar.syllableConstructors.push(new SyllableLine());
    }

    addFlowersWord(): void {
        this.aidar.flowersWords.push('');
    }

    add(event: MatChipInputEvent, i, type): void {

        console.log(event);

        const input = event.input;
        const value = event.value;

        console.log('value', value);

        if (value.trim() !== '') {
            if (type === 'text') {
                this.aidar.buyn[i].text.push(value.trim());
            } else if (type === 'extraText') {
                this.aidar.buyn[i].extraText.push(value.trim());
            } else if (type === 'boxSorting.letters') {
                this.aidar.boxSorting[i].letters.push(value.trim());
            } else if (type === 'saikestendirPhoto.images') {
                this.aidar.saikestendirPhoto[i].images.push(value.trim());
            } else if (type === 'sozKura.text') {
                this.aidar.sozKura[i].text.push(value.trim());
            } else if (type === 'pazzle.text') {
                this.aidar.pazzle.text.push(value.trim());
            } else if (type === 'pazzle.text') {
                this.aidar.pazzle.text.push(value.trim());
            } else if (type === 'pazzleBuyn.text') {
                const aripTusy = new AripTusy();
                aripTusy.letter = value.trim();
                aripTusy.color = 'red';
                this.aidar.pazzleBuyn.text.push(aripTusy);
            } else if (type === 'pazzle.letter') {
                this.aidar.pazzle.letters.push(value.trim());
            } else if (type === 'pazzleBuyn.letter') {
                const aripTusy = new AripTusy();
                aripTusy.letter = value.trim();
                aripTusy.color = 'red';
                this.aidar.pazzleBuyn.letters.push(aripTusy);
            } else if (type === 'putLetters.extraText') {
                this.aidar.putLetters.extraLetters.push(value.trim());
            } else if (type === 'find.letters') {
                this.aidar.find.letters.push(value.trim());
            } else if (type === 'createWord.answers') {
                this.aidar.createWord.answers.push(value.trim());
            } else if (type === 'createWord.extraLetters') {
                this.aidar.createWord.extraLetters.push(value.trim());
            } else if (type === 'wrongWord.words') {
                this.aidar.wrongWord.words.push(value.trim());
            } else if (type === 'wrongWord.wrongWords') {
                this.aidar.wrongWord.wrongWords.push(value.trim());
            } else if (type === 'syllableConstructor.syllable') {
                this.aidar.syllableConstructors[i].syllables.push(value.trim());
            } else if (type === 'syllableLine.syllable') {
                this.aidar.syllableLine[i].syllables.push(value.trim());
            }
        }

        if (input) {
            input.value = '';
        }
    }

    remove(text, i, type): void {
        if (type === 'text') {
            const index = this.aidar.buyn[i].text.indexOf(text);
            if (index >= 0) {
                this.aidar.buyn[i].text.splice(index, 1);
            }
        } else if (type === 'extraText') {
            const index = this.aidar.buyn[i].extraText.indexOf(text);
            if (index >= 0) {
                this.aidar.buyn[i].extraText.splice(index, 1);
            }
        } else if (type === 'pazzle.text') {
            const index = this.aidar.pazzle.text.indexOf(text);
            if (index >= 0) {
                this.aidar.pazzle.text.splice(index, 1);
            }
        } else if (type === 'pazzleBuyn.text') {
            const index = this.aidar.pazzleBuyn.text.indexOf(text);
            if (index >= 0) {
                this.aidar.pazzleBuyn.text.splice(index, 1);
            }
        } else if (type === 'pazzle.letter') {
            const index = this.aidar.pazzle.letters.indexOf(text);
            if (index >= 0) {
                this.aidar.pazzle.letters.splice(index, 1);
            }
        } else if (type === 'pazzleBuyn.letter') {
            const index = this.aidar.pazzleBuyn.letters.indexOf(text);
            if (index >= 0) {
                this.aidar.pazzleBuyn.letters.splice(index, 1);
            }
        } else if (type === 'putLetters.extraText') {
            const index = this.aidar.putLetters.extraLetters.indexOf(text);
            if (index >= 0) {
                this.aidar.putLetters.extraLetters.splice(index, 1);
            }
        } else if (type === 'boxSorting.letters') {
            const index = this.aidar.boxSorting[i].letters.indexOf(text);
            if (index >= 0) {
                this.aidar.boxSorting[i].letters.splice(index, 1);
            }
        } else if (type === 'syllableLine.syllable') {
            const index = this.aidar.syllableLine[i].syllables.indexOf(text);
            if (index >= 0) {
                this.aidar.syllableLine[i].syllables.splice(index, 1);
            }
        } else if (type === 'syllableConstructor.syllable') {
            const index = this.aidar.syllableConstructors[i].syllables.indexOf(text);
            if (index >= 0) {
                this.aidar.syllableConstructors[i].syllables.splice(index, 1);
            }
        } else if (type === 'find.letters') {
            const index = this.aidar.find.letters.indexOf(text);
            if (index >= 0) {
                this.aidar.find.letters.splice(index, 1);
            }
        } else if (type === 'createWord.answers') {
            const index = this.aidar.createWord.answers.indexOf(text);
            if (index >= 0) {
                this.aidar.createWord.answers.splice(index, 1);
            }
        } else if (type === 'createWord.extraLetters') {
            const index = this.aidar.createWord.extraLetters.indexOf(text);
            if (index >= 0) {
                this.aidar.createWord.extraLetters.splice(index, 1);
            }
        } else if (type === 'wrongWord.words') {
            const index = this.aidar.wrongWord.words.indexOf(text);
            if (index >= 0) {
                this.aidar.wrongWord.words.splice(index, 1);
            }
        } else if (type === 'wrongWord.wrongWords') {
            const index = this.aidar.wrongWord.wrongWords.indexOf(text);
            if (index >= 0) {
                this.aidar.wrongWord.wrongWords.splice(index, 1);
            }
        }
    }

    changeFlowerWord(event, i): void {
        this.aidar.flowersWords[i] = event.srcElement.value;
    }

    changeColor(i: number, field: string): void {
        if (field === 'text') {
            const color = this.aidar.pazzleBuyn.text[i].color;
            if (color === 'red') {
                this.aidar.pazzleBuyn.text[i].color = 'blue';
            } else {
                this.aidar.pazzleBuyn.text[i].color = 'red';
            }
        } else {
            const color = this.aidar.pazzleBuyn.letters[i].color;
            if (color === 'red') {
                this.aidar.pazzleBuyn.letters[i].color = 'blue';
            } else {
                this.aidar.pazzleBuyn.letters[i].color = 'red';
            }
        }
    }
}

