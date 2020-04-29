import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AidarService} from '../../core/services/aidar.service';
import {MatDialog} from '@angular/material';
import {Aidar} from '../../core/models/aidar';
import {AripTusy} from '../../core/models/games/pazzleBuynKizilKok';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';


@Component({
    selector: 'app-buyn-kizil-kok',
    templateUrl: './buyn-kizil-kok.component.html',
    styleUrls: ['./buyn-kizil-kok.component.scss']
})
export class BuynKizilKokComponent implements OnInit, OnDestroy {

    @Input() aidar: Aidar;

    text: AripTusy[] = [];
    letters: AripTusy[] = [];

    idList: string[] = [];

    audio = new Audio();
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    count = 0;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _aidarService: AidarService,
        public _matDialog: MatDialog
    ) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {

        console.log('aidar', this.aidar);

        for (let i = 0; i < this.aidar.pazzleBuyn.letters.length; i++) {
            const randomPosition = Math.floor(Math.random() * this.aidar.pazzleBuyn.letters.length);
            if (this.letters.indexOf(this.aidar.pazzleBuyn.letters[randomPosition]) === -1) {
                this.letters.push(this.aidar.pazzleBuyn.letters[randomPosition]);
            } else {
                i--;
            }
        }
        console.log('aidarLetters', this.aidar.pazzleBuyn.letters);
        console.log('letters', this.letters);

        for (let i = 0; i < this.aidar.pazzleBuyn.text.length; i++) {
            this.idList.push(i.toString());

            const arip = new AripTusy();
            arip.letter = '-';
            arip.color = '';

            this.text.push(arip);
        }

        console.log('text', this.text);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    playAudio(path1): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + path1;
        this.audio.load();
        this.audio.play();
    }

    drop(event: CdkDragDrop<any[]>, i): void {
        console.log('event', event);
        const droppedArip = event.item.data;
        console.log('droppedArip', droppedArip);
        console.log('text[i]', this.aidar.pazzleBuyn.text[i]);
        console.log('text[i].letter', this.text[i].letter);
        if (this.text[i].letter === '-' && this.aidar.pazzleBuyn.text[i].color === droppedArip.color
            && this.aidar.pazzleBuyn.text[i].letter === droppedArip.letter) {
            console.log('They are equal');
            this.text[i] = droppedArip;
            this.remove(event.item.data);

            this.audio.pause();
            this.audio = new Audio();
            this.audio.src = 'assets/audio/trintrin.mp3';
            this.audio.load();
            this.audio.play();

            this.count++;

            if (this.count === this.aidar.pazzleBuyn.text.length) {
                this.finish();
            }
        }
    }

    finish() {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = 'assets/audio/T6.mp3';
        this.audio.load();
        this.openDialog(true);
        this.audio.play();
    }

    openDialog(check): void {
        this._matDialog.open(AnswerDialogComponent, {
            width: '200px',
            height: '200px',
            data: {answer: check}
        });
        setTimeout(res => {
            this._matDialog.closeAll();
        }, 1500);
    }


    remove(object): void {
        this.letters.splice(this.letters.indexOf(object), 1);
    }

}




