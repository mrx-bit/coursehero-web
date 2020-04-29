import {Component, Input, OnInit} from '@angular/core';
import {Aidar} from '../../core/models/aidar';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {MatDialog} from '@angular/material';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';

@Component({
    selector: 'app-odd-img',
    templateUrl: './odd-img.component.html',
    styleUrls: ['./odd-img.component.scss']
})
export class OddImgComponent implements OnInit {

    @Input() aidar: Aidar;
    correct = [];
    audio = new Audio();
    all = [];
    extra = [];
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    answerCount = 0;
    selectedAnswerCount = 0;

    constructor( public dialog: MatDialog) {
    }

    ngOnInit() {
        for (let i = 0; i < this.aidar.oddImages.length; i++) {
            if (this.aidar.oddImages[i].answer === true) {
                this.answerCount++;
            }
        }
    }

    playAudio(path1): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + path1;
        this.audio.load();
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

    chosen(list: any): void {
        this.audio.pause();
        if (list.answer === true) {
            this.selectedAnswerCount++;
            if (this.selectedAnswerCount === this.answerCount) {
                this.audio = new Audio();
                this.audio.src = 'assets/audio/T6.mp3';
                this.audio.load();
                this.openDialog(true);
                this.audio.play();

            } else {
                this.audio = new Audio();
                this.audio.src = 'assets/audio/trintrin.mp3';
                this.audio.load();
                this.openDialog(true);
                this.audio.play();

            }



        } else {
            this.audio = new Audio();
            this.audio.src = 'assets/audio/asygystykjasama.mp3';
            this.audio.load();
            this.openDialog(false);
            this.audio.play();
        }
    }


}
