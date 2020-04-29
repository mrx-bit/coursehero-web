import {ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';
import {MatDialog} from '@angular/material';
import {SoundsConstant} from '../../core/constants/sounds.constant';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';

export class CircleLetter {
    iter: any;
    letter: any;
    color: any;
    w: any;
    h: any;
    x: any;
    y: any;
    centerX: any;
    centerY: any;
    isFirst: boolean;
    selecting = false;
    selected = false;
    audio = new Audio();


    constructor(iter?: any, letter?: any, color?: any,
                x?: any, y?: any, w?: any, h?: any,
                centerX?: any, centerY?: any, isFirst?: boolean) {
        this.iter = iter || 0;
        this.letter = letter || '';
        this.color = color || '';

        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 0;
        this.h = h || 0;
        this.centerX = centerX || 0;
        this.centerY = centerY || 0;

        this.isFirst = isFirst || false;
    }
}

export class CircleWord {
    iter: any;
    letters = Array<CircleLetter>();
    word: string;
    done: boolean;

    constructor(iter: any, word: string, letters: any, done: any) {
        this.iter = iter;
        this.letters = letters;
        this.word = word;
        this.done = done;
    }
}

@Component({
    selector: 'app-flowers-word',
    templateUrl: './flowers-word.component.html',
    styleUrls: ['./flowers-word.component.scss']
})
export class FlowersWordComponent implements OnInit {
    @Input() aidar: Aidar;
    @ViewChild('mainDiv', {static: false}) d1: ElementRef;
    fullWidth: any;
    circleWords = Array<CircleWord>();
    bookId: any;
    db: any;
    audio = new Audio;
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private _service: AidarService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.fetchFromDB(this.aidar.id);
    }

    fetchFromDB(aidarId): void {
        this._service.getById(aidarId).pipe().subscribe((response: Aidar) => {
            this.db = response.flowersWords;
            // this.bookId = response.bookId;

            this.drawCircles();

            this.changeDetectorRef.detectChanges();
        }, error => {
            console.log('Class: FlowersWordComponent, Function: fetchFromDB, Line 89 (): ', error);
        });
    }


    playAudio(path1): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + path1;
        this.audio.load();
        this.audio.play();

    }

    @HostListener('window:resize', ['$event.target'])
    onResize(): void {
        this.overDrawCircles();

        this.changeDetectorRef.detectChanges();
    }

    drawCircles(): void {
        this.fullWidth = this.d1.nativeElement.offsetWidth;
        const rectContWidth = this.fullWidth / 2;
        const rectContHeight = rectContWidth / 2;

        const rectWidth = rectContWidth / 4;

        this.db.forEach((items, index) => {

            const circleLetters = Array<CircleLetter>();

            for (let i = 0; i < items.length; i++) {
                const circleLetter = new CircleLetter();
                circleLetter.iter = i;
                circleLetter.letter = items[i];
                circleLetter.isFirst = (i === 0);
                circleLetter.w = rectWidth - 25;
                circleLetter.h = rectWidth - 25;
                switch (i) {
                    case 0:
                        // center
                        circleLetter.x = rectContWidth / 2 - rectWidth / 2;
                        circleLetter.y = rectContHeight / 2 - rectWidth / 2;
                        break;
                    case 1:
                        // north - east
                        circleLetter.x = rectContWidth / 2;
                        circleLetter.y = rectContHeight / 2 - rectWidth;
                        break;
                    case 2:
                        // north - west
                        circleLetter.x = rectContWidth / 2 - rectWidth;
                        circleLetter.y = rectContHeight / 2 - rectWidth;
                        break;
                    case 3:
                        if (items.length - 1 === i) {
                            // south
                            circleLetter.x = rectContWidth / 2 - rectWidth / 2;
                            circleLetter.y = rectContHeight / 2;
                        } else {
                            // south - west
                            circleLetter.x = rectContWidth / 2 - rectWidth;
                            circleLetter.y = rectContHeight / 2;
                        }
                        break;
                    case 4:
                        // south - east
                        circleLetter.x = rectContWidth / 2;
                        circleLetter.y = rectContHeight / 2;
                        break;
                    case 5:
                        // west
                        circleLetter.x = rectContWidth / 2 - rectWidth;
                        circleLetter.y = rectContHeight / 2 - rectWidth / 2;
                        break;
                    case 6:
                        // east
                        circleLetter.x = rectContWidth / 2;
                        circleLetter.y = rectContHeight / 2 - rectWidth / 2;
                        break;
                    case 7:
                        // north
                        circleLetter.x = rectContWidth / 2 - rectWidth / 2;
                        circleLetter.y = rectContHeight / 2 - rectWidth;
                        break;
                    case 8:
                        // south
                        circleLetter.x = rectContWidth / 2 - rectWidth / 2;
                        circleLetter.y = rectContHeight / 2;
                        break;
                }

                circleLetters.push(circleLetter);
            }

            this.circleWords.push(new CircleWord(index, items, circleLetters, false));
        });
    }

    overDrawCircles(): void {
        this.fullWidth = this.d1.nativeElement.offsetWidth;
        const rectContWidth = this.fullWidth / 2;
        const rectContHeight = rectContWidth / 2;

        const rectWidth = rectContWidth / 4;

        for (let i = 0; i < this.circleWords.length; i++) {

            for (let j = 0; j < this.circleWords[i].letters.length; j++) {
                this.circleWords[i].letters[j].w = rectWidth - 25;
                this.circleWords[i].letters[j].h = rectWidth - 25;
                switch (j) {
                    case 0:
                        // center
                        this.circleWords[i].letters[j].x = rectContWidth / 2 - rectWidth / 2;
                        this.circleWords[i].letters[j].y = rectContHeight / 2 - rectWidth / 2;
                        break;
                    case 1:
                        // north - east
                        this.circleWords[i].letters[j].x = rectContWidth / 2;
                        this.circleWords[i].letters[j].y = rectContHeight / 2 - rectWidth;
                        break;
                    case 2:
                        // north - west
                        this.circleWords[i].letters[j].x = rectContWidth / 2 - rectWidth;
                        this.circleWords[i].letters[j].y = rectContHeight / 2 - rectWidth;
                        break;
                    case 3:
                        if (this.circleWords[i].letters.length - 1 === j) {
                            // south
                            this.circleWords[i].letters[j].x = rectContWidth / 2 - rectWidth / 2;
                            this.circleWords[i].letters[j].y = rectContHeight / 2;
                        } else {
                            // south - west
                            this.circleWords[i].letters[j].x = rectContWidth / 2 - rectWidth;
                            this.circleWords[i].letters[j].y = rectContHeight / 2;
                        }
                        break;
                    case 4:
                        // south - east
                        this.circleWords[i].letters[j].x = rectContWidth / 2;
                        this.circleWords[i].letters[j].y = rectContHeight / 2;
                        break;
                    case 5:
                        // west
                        this.circleWords[i].letters[j].x = rectContWidth / 2 - rectWidth;
                        this.circleWords[i].letters[j].y = rectContHeight / 2 - rectWidth / 2;
                        break;
                    case 6:
                        // east
                        this.circleWords[i].letters[j].x = rectContWidth / 2;
                        this.circleWords[i].letters[j].y = rectContHeight / 2 - rectWidth / 2;
                        break;
                    case 7:
                        // north
                        this.circleWords[i].letters[j].x = rectContWidth / 2 - rectWidth / 2;
                        this.circleWords[i].letters[j].y = rectContHeight / 2 - rectWidth;
                        break;
                    case 8:
                        // south
                        this.circleWords[i].letters[j].x = rectContWidth / 2 - rectWidth / 2;
                        this.circleWords[i].letters[j].y = rectContHeight / 2;
                        break;
                }
            }
        }
    }

    letterClicked(cword: CircleWord, cletter: CircleLetter): void {
        if (!cword.done) {
            cletter.selected = true;

            const selectedLetters = cword.letters.filter(selected => {
                return selected.selecting;

            });

            if (selectedLetters.length > 0) {
                const previousLetterIndex = selectedLetters.length;

                if (cword.word.charAt(previousLetterIndex) === cletter.letter) {
                    if (cword.letters.length === selectedLetters.length + 1) {
                        cword.done = true;
                        this.finish();
                    }
                } else {
                    for (let i = 0; i < this.circleWords[cword.iter].letters.length; i++) {
                        if (this.circleWords[cword.iter].letters[i].selected) {
                            this.circleWords[cword.iter].letters[i].selected = false;
                            this.circleWords[cword.iter].letters[i].selecting = false;
                            this.circleWords[cword.iter].letters[i].selected = false;
                            this.circleWords[cword.iter].letters[i].selecting = false;


                            this.playAudio1();
                        }
                    }


                    this.changeDetectorRef.detectChanges();

                    return;
                }
            }
            cletter.selecting = true;
        }

    }

    playAudio1(): void {
        console.log('ERROR-KATE');
        this.audio.pause();
        const audio = new Audio();
        this.audio.src =  'assets/audio/asygystykjasama.mp3';
        this.audio.load();
        this.openDialog(false);
        this.audio.play();
    }


    finish() {
        console.log('FINISH');
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = 'assets/audio/T6.mp3';
        this.audio.load();
        /*this.openDialog(true);*/
        this.audio.play();
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
