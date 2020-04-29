import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';
import {Aidar} from '../../core/models/aidar';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {AidarService} from '../../core/services/aidar.service';
import {MatDialog} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-soz-kura',
    templateUrl: './soz-kura.component.html',
    styleUrls: ['./soz-kura.component.scss']
})
export class SozKuraComponent implements OnInit, OnDestroy {
    @Input() aidar: Aidar;
    audio = new Audio();
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    randomLeksems: string[] = [];
    boxes: string[] = [];
    rightAnswer: string[] = [];
    count = 0;

    private _unsubscribeAll: Subject<any>;

    constructor(private _service: AidarService,
                public dialog: MatDialog) {
    }

    ngOnDestroy(): void {
        this._unsubscribeAll = new Subject<any>();
    }


    ngOnInit(): void {

        this.getGame();
    }

    getGame(): void {
        const text = this.aidar.sozKura.text.split(' ');
        this.rightAnswer = text;
        console.log('text', text);
        for (let i = 0; i < text.length; i++) {
            const randomPos = Math.floor(Math.random() * text.length);
            if (this.randomLeksems.indexOf(text[randomPos]) === -1) {
                this.randomLeksems.push(text[randomPos]);
                this.boxes.push('-')


            } else {

                i--;
            }
        }
        console.log('rightAnswer', this.rightAnswer);
        /*for (let i = 0; i < text.length; ) {
            const randomPos = Math.floor(Math.random() * (text.length - 1));
            if (this.randomLeksems[randomPos] === null || this.randomLeksems[randomPos] === undefined) {
                this.randomLeksems[randomPos] = text[i];
                i++;
            }
        }*/
    }

    drop(event: CdkDragDrop<any[]>, i): void {
        console.log('event', event);
        const droppedWord = event.item.data;
        console.log('droppedWord', droppedWord);
        if (this.boxes[i] === '-' && this.rightAnswer[i] === droppedWord) {
            this.boxes[i] = droppedWord;
            this.remove(droppedWord);
            this.audio.pause();
            this.audio = new Audio();
            this.audio.src = 'assets/audio/trintrin.mp3';
            this.audio.load();
            // this.openDialog(true);
            this.audio.play();
            this.count = this.count + 1;
            if (this.count === this.rightAnswer.length) {
                this.finish();
            } else if (this.rightAnswer[i] !== droppedWord) {
                this.errorAudio();
            }
        }
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

    playAudio(path1): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + path1;
        this.audio.load();
        this.audio.play();

    }

    winAudio(): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = 'assets/audio/trintrin.mp3';
        this.audio.load();
        /*    this.openDialog(true);*/
        this.audio.play();

    }

    finish() {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = 'assets/audio/T6.mp3';
        this.audio.load();
        this.openDialog(true);
        this.audio.play();
    }

    errorAudio(): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = 'assets/audio/asygystykjasama.mp3';
        this.audio.load();
        /*    this.openDialog(true);*/
        this.audio.play();

    }

    remove(object): void {
        this.randomLeksems.splice(this.randomLeksems.indexOf(object), 1);
    }
}
