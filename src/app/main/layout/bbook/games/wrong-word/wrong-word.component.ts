import {Component, Input, OnInit} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {AidarService} from '../../core/services/aidar.service';

import {Aidar} from '../../core/models/aidar';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';
import {MatDialog} from '@angular/material';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
@Component({
    selector: 'app-wrong-word',
    templateUrl: './wrong-word.component.html',
    styleUrls: ['./wrong-word.component.scss']
})
export class WrongWordComponent implements OnInit {

    @Input() aidar: Aidar;
    audio = new Audio();
    count = 0;
    evens = ['1', '2', 'numbers', 'even', 'wrongs'];
    numbers = [];
    extra = [];
    randomList: any [] = [];
    even = [];
    wrongs = [];
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    constructor(private _service: AidarService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getGame();
    }


    playAudio(path1): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + path1;
        this.audio.load();
        this.audio.play();

    }

    getGame(): void {
        this._service.getById(this.aidar.id)
            .pipe()
            .subscribe(response => {
                this.aidar = response;
                this.extra = [...this.aidar.wrongWord.words, ...this.aidar.wrongWord.wrongWords];
                for (let i = 0; i < this.extra.length; i++) {
                    const ran = Math.floor(Math.random() * this.extra.length);
                    if (this.randomList.indexOf(ran) === -1) {
                        this.randomList.push(ran);
                        this.numbers.push(this.extra[ran]);
                    } else {
                        i--;
                    }
                }
                this.wrongs = this.aidar.wrongWord.wrongWords;
            });
    }

    drop(event: CdkDragDrop<number[]>): void {
        for (let i = 0; i < this.wrongs.length; i++) {
            if (this.wrongs[i] === event.item.data) {
                this.remove(event.item.data);
                this.even.push(event.item.data);
                this.audio.pause();
                this.audio = new Audio();
                this.audio.src = 'assets/audio/trintrin.mp3';
                this.audio.load();
                // this.openDialog(true);
                this.audio.play();
                this.count++;


                console.log(this.aidar.wrongWord.words.length);

                if (this.count === this.aidar.wrongWord.wrongWords.length) {
                    this.finish();
                }}
            // } else  {
            //     this.audio.pause();
            //     this.audio = new Audio();
            //     this.audio.src = 'assets/audio/asygystykjasama.mp3';
            //     this.audio.load();
            //     // this.openDialog(true);
            //     this.audio.play();
            // }
        }
    }

    remove(object): void {
        for (let i = 0; i < this.numbers.length; i++) {
            if (this.numbers[i] === object) {
                this.numbers.splice(i, 1);
                break;
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
