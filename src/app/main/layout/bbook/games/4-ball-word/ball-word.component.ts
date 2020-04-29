import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SoundsConstant} from '../../core/constants/sounds.constant';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';
import {MatDialog} from '@angular/material';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';

export class Word {
    value: number;
    originalValue: string;
    selecting: boolean;

    constructor(value: string, selecting: boolean) {
        this.originalValue = value;
        this.selecting = selecting;
    }
}

@Component({
    selector: 'app-ball-word',
    templateUrl: './ball-word.component.html',
    styleUrls: ['./ball-word.component.scss']
})
export class BallWordComponent implements OnInit {
    @Input() aidar: Aidar;
    bookId: any;
    letters = [];
    secondLetters = [];
    hiddenWord = '';
    iter = 0;
    audio = new Audio();
    @ViewChild('mainDiv', {static: false}) d1: ElementRef;
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private _service: AidarService,
                public dialog: MatDialog) {}

    ngOnInit(): void {
        this.fetchLetters(this.aidar.id);
    }


    playAudio(path1): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + path1;
        this.audio.load();
        this.audio.play();

    }

    fetchLetters(aidarId): void {
        this._service.getById(aidarId).pipe().subscribe((response: Aidar) => {
            this.letters = response.ballWord.letters;
            this.secondLetters = Object.assign([], this.letters);
            this.letters = this.shuffle(this.letters);
        }, error => {
            console.log('Class: BallWordComponent, Function: fetchLetters, Line 48 (): ', error);
        });
    }

    ballClicked(letter): void {
        if (!letter.selecting) {
            letter.selecting = true;
            this.secondLetters[this.iter].value = letter.originalValue;
            this.hiddenWord += letter.originalValue;
            const finished = this.secondLetters.filter(item => {
                return item.selecting && (item.originalIndex === item.index);
            });

            if (finished.length === this.secondLetters.length) {
                const result = this.secondLetters.filter(item => {
                    return item.value === item.originalValue;
                });
                if (result.length === this.secondLetters.length) {
                    this.playAudio1(SoundsConstant.CORRECT);
                } else {
                    this.playAudio1(SoundsConstant.INCORRECT);
                    for (let o = 0; o < this.secondLetters.length; o++) {
                        this.secondLetters[o].selecting = false;
                        this.secondLetters[o].value = '';
                    }
                    this.hiddenWord = '';
                    this.iter = 0;
                }
                return;
            }
            this.iter++;
        } else {
            letter.selecting = false;


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

    playAudio1(state): void {
        const audio = new Audio();
        switch (state) {
            case SoundsConstant.CORRECT:
                audio.src = SoundsConstant.CORRECT_SOUND;
                this.openDialog(true);
                break;
            case SoundsConstant.INCORRECT:
                audio.src = SoundsConstant.INCORRECT_2_SOUND;
                this.openDialog(false);
                break;
        }
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
