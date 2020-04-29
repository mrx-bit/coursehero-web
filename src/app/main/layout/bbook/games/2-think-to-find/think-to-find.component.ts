import {ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';
import {MatDialog} from '@angular/material';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';


export class Syllable {
    iter: any;
    value: any;
    color: any;


    x: any;
    y: any;
    w: any;
    h: any;
    sortIter: any;

    centerX: any;
    centerY: any;


    selecting = false;
    selected = false;
    done = false;

    constructor(iter: any, value: any, color: any,
                x: any, y: any, w: any, h: any,
                centerX: any, centerY: any, sortIter: any) {
        this.iter = iter;
        this.value = value;
        this.color = color;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.centerX = centerX;
        this.centerY = centerY;
        this.sortIter = sortIter;
    }
}

export class SyllableLine {
    wordList = [];
    centerX1: any;
    centerY1: any;
    centerX2: any;
    centerY2: any;
    color: any;
    show: boolean;

    constructor(centerX1?: any, centerY1?: any, centerX2?: any, centerY2?: any, color?: any) {
        this.centerX1 = centerX1 || 0;
        this.centerY1 = centerY1 || 0;

        this.centerX2 = centerX2 || 0;
        this.centerY2 = centerY2 || 0;

        this.color = color || '#FDD835';
        this.show = false;
    }
}

@Component({
    selector: 'app-think-to-find',
    templateUrl: './think-to-find.component.html',
    styleUrls: ['./think-to-find.component.scss'],
})
export class ThinkToFindComponent implements OnInit {


    db: any;

    syllables = Array<Syllable>();
    syllableGroupped = new Map();
    syllableLines = Array<SyllableLine>();
    @Input() aidar: Aidar;
    fullWidth: any;
    bookId: any;
    audio = new Audio();
    baseUrl = ServiceCommonConstant.bbookModuleUrl;
    @ViewChild('mainDiv', {static: false}) d1: ElementRef;

    constructor(private renderer: Renderer2,
                private changeDetectorRef: ChangeDetectorRef,
                private _service: AidarService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.fetchFromDB(this.aidar.id);
    }

    @HostListener('window:resize', ['$event.target'])
    onResize(): void {
        this.overrideRects();
        this.overrideLines();
        this.changeDetectorRef.detectChanges();
    }

    playAudio(path1): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + path1;
        this.audio.load();
        this.audio.play();

    }

    fetchFromDB(aidarId): void {
        this._service.getById(aidarId).pipe().subscribe((response: Aidar) => {
            this.db = response.syllableLine;
            // this.bookId = response.bookId;
            this.drawRects();
            this.drawLines();
            this.syllables = this.shuffle(this.syllables);
            this.onResize();
        }, error => {
            console.log('Class: BallWordComponent, Function: fetchLetters, Line 48 (): ', error);
        });
    }

    drawRects(): void {
        this.fullWidth = this.d1.nativeElement.offsetWidth;
        const rectContWidth = this.fullWidth / 3.5;
        const rectContHeight = rectContWidth / 2;

        const rectWidth = rectContWidth / 2;
        const rectHeight = rectWidth / 2;
        let iter = 0, resetcount = 0;


        let sortIter = 0;
        this.db.forEach((items, index) => {

            for (const value of items.syllables) {

                const rectY = iter * (rectContWidth / 2);
                let rectX = (iter % 2 === 0) ? rectHeight : 0;
                rectX += rectContHeight * resetcount;
                if ((rectY + rectWidth) > this.fullWidth * 0.85) {
                    iter = 0;
                    resetcount++;
                }
                const centerY = rectX + (rectWidth / 2) - 50;
                const centerX = rectY + (rectHeight / 2) + 50;

                this.syllables.push(new Syllable(index, value, items.color,
                    rectX, rectY, rectWidth, rectHeight, centerX, centerY, sortIter));
                iter++;
                sortIter++;
            }
        });
    }

    drawLines(): void {
        this.syllableGroupped = this.groupBy(this.syllables, syllable => syllable.iter);
        this.syllableGroupped.forEach((value: any, key: string) => {
            // console.log(key, value);
            let syllableLine = new SyllableLine();

            value.forEach((syllable, index) => {
                if (index !== 0) {
                    syllableLine.centerX2 = syllable.centerX;
                    syllableLine.centerY2 = syllable.centerY;
                    syllableLine.wordList.push(syllable.value);
                    this.syllableLines.push(syllableLine);
                }

                syllableLine = new SyllableLine();
                syllableLine.centerX1 = syllable.centerX;
                syllableLine.centerY1 = syllable.centerY;
                syllableLine.color = syllable.color;
                syllableLine.wordList.push(syllable.value);
                syllableLine.show = false;
            });
        });
    }

    overrideRects(): void {
        this.fullWidth = this.d1.nativeElement.offsetWidth;
        const rectContWidth = this.fullWidth / 3.5;
        const rectContHeight = rectContWidth / 2;

        const rectWidth = rectContWidth / 2;
        const rectHeight = rectWidth / 2;
        let iter = 0, resetcount = 0;


        for (let l = 0; l < this.syllables.length; l++) {
            const rectY = iter * (rectContWidth / 2);
            let rectX = (iter % 2 === 0) ? rectHeight : 0;
            rectX += rectContHeight * resetcount;
            if ((rectY + rectWidth) > this.fullWidth * 0.85) {
                iter = 0;
                resetcount++;
            }
            const centerY = rectX + (rectWidth / 2) - 50;
            const centerX = rectY + (rectHeight / 2) + 50;

            this.syllables[l].x = rectX;
            this.syllables[l].y = rectY;
            this.syllables[l].w = rectWidth;
            this.syllables[l].h = rectHeight;
            this.syllables[l].centerY = centerY;
            this.syllables[l].centerX = centerX;

            iter++;
        }
    }

    overrideLines(): void {
        this.syllableGroupped = this.groupBy(this.compare(this.syllables), syllable => syllable.iter);
        this.syllableGroupped.forEach((value: any, key: string) => {
            // console.log(key, value);
            let syllableLine = new SyllableLine();
            value.forEach((syllable, index) => {
                if (index !== 0) {
                    syllableLine.centerX2 = syllable.centerX;
                    syllableLine.centerY2 = syllable.centerY;
                    syllableLine.wordList.push(syllable.value);
                    const itemIndex = this.syllableLines.findIndex(item => {
                        return item.wordList.sort().join(',') === syllableLine.wordList.sort().join(',');
                    });
                    this.syllableLines[itemIndex].centerX1 = syllableLine.centerX1;
                    this.syllableLines[itemIndex].centerY1 = syllableLine.centerY1;
                    this.syllableLines[itemIndex].centerX2 = syllableLine.centerX2;
                    this.syllableLines[itemIndex].centerY2 = syllableLine.centerY2;
                }

                syllableLine = new SyllableLine();
                syllableLine.centerX1 = syllable.centerX;
                syllableLine.centerY1 = syllable.centerY;
                syllableLine.wordList.push(syllable.value);
            });
        });
    }


    compare(values) {
        return values.sort((a, b) => {
            if (a.sortIter < b.sortIter) {
                return -1;
            } else if (a.sortIter > b.sortIter) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    isOdd(num): boolean {
        return (num % 2 !== 1);
    }

    groupBy(list, keyGetter): any {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    syllableClicked(syllable: Syllable): void {
        if (!syllable.selected) {
            syllable.selected = true;
            syllable.selecting = true;

            const selectedSyllables = this.syllables.filter(selected => {
                return selected.selecting;
            });


            if (selectedSyllables.length !== 1) {
                const check = this.groupBy(selectedSyllables, selectedSyllable => selectedSyllable.iter);

                if (check.size > 1) {
                    for (let i = 0; i < this.syllables.length; i++) {
                        if (!this.syllables[i].done) {
                            this.syllables[i].selecting = false;
                            this.syllables[i].selected = false;
                        }
                    }
                }

                const values = this.syllableGroupped.get(syllable.iter);
                if (values.length === selectedSyllables.length) {
                    this.playAudio1();
                    this.openDialog(true);
                    const selectedSyllableValues = [];
                    selectedSyllables.forEach(syllableVal => {
                        selectedSyllableValues.push(syllableVal.value);
                    });

                    const checker = (arr, target) => target.every(v => arr.includes(v));

                    for (let l = 0; l < this.syllableLines.length; l++) {
                        if (checker(selectedSyllableValues, this.syllableLines[l].wordList)) {
                            this.syllableLines[l].show = true;
                        }
                    }

                    for (let i = 0; i < this.syllables.length; i++) {
                        if (this.syllables[i].selecting) {
                            this.syllables[i].done = true;
                            this.syllables[i].selecting = false;
                        }
                    }
                }
            }
        }
    }


    shuffle(arr): any {
        let i,
            j,
            temp;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    playAudio1(): void {
        const audio = new Audio();
        // audio.src = SoundsConstant.CORRECT_SOUND;
        audio.load();
        audio.play();
    }

    openDialog(check): void {
        const dialogRef = this.dialog.open(AnswerDialogComponent, {
            width: '200px',
            height: '200px',
            data: {answer: check}
        });
        setTimeout(res => {
            this.dialog.closeAll();
        }, 1500);
    }
}
