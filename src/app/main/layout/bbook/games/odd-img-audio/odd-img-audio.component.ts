import {Component, Inject, Input, OnInit} from '@angular/core';
import {Aidar} from '../../core/models/aidar';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import { MatDialog } from '@angular/material';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-odd-img-audio',
    templateUrl: './odd-img-audio.component.html',
    styleUrls: ['./odd-img-audio.component.scss']
})
export class OddImgAudioComponent implements OnInit {

    @Input() aidar: Aidar;
    correct = [];
    audio = new Audio();
    all = [];
    extra = [];
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    constructor(public dialog: MatDialog) {
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

    ngOnInit() {

    }

    playAudio(path1): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + path1;
        this.audio.load();
        this.audio.play();

    }

    chosen(list: any): void {
        this.audio.pause();
        if (list.answer === true) {
            this.audio = new Audio();
            this.audio.src = 'assets/audio/T6.mp3';
            this.audio.load();
            this.openDialog(true);
            this.audio.play();

        } else {
            this.audio = new Audio();
            this.audio.src = 'assets/audio/asygystykjasama.mp3';
            this.audio.load();
            this.openDialog(false);
            this.audio.play();
        }
    }
}

