import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {MatDialog} from '@angular/material';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';

@Component({
    selector: 'app-question-image',
    templateUrl: './question-image.component.html',
    styleUrls: ['./question-image.component.scss']
})
export class QuestionImageComponent implements OnInit {
    @Input() aidar: Aidar;
    idList = [];
    answer: Answer = new Answer();
    randomList: any[] = [];
    baseUrl = ServiceCommonConstant.bbookModuleUrl;
    audio = new Audio();
    count = 0;

    constructor(private _service: AidarService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getGame();

    }

    getGame(): void {
        this._service.getById(this.aidar.id)
            .pipe()
            .subscribe(response => {
                this.aidar = response;
                this.answer.allText = [...this.aidar.pazzle.letters, ...this.aidar.pazzle.text];
                this.answer.answer = this.aidar.pazzle.text;
                for (let i = 0; i < this.answer.allText.length; i++) {
                    const ran = Math.floor(Math.random() * this.answer.allText.length);
                    if (this.randomList.indexOf(ran) === -1) {
                        this.randomList.push(ran);
                        this.answer.allTextRandom.push(this.answer.allText[ran]);
                    } else {
                        i--;
                    }
                }
                for (let i = 0; i < this.answer.answer.length; i++) {
                    this.idList.push(i.toString());
                    this.answer.display.push('-');
                }
            });
        this.idList.push('all');

    }


    playAudio(path1): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + path1;
        this.audio.load();
        this.audio.play();

    }

    drop(event: CdkDragDrop<any[]>, i): void {
        if (this.answer.display[i] === '-' && this.answer.answer[i] === event.item.data) {
            this.answer.display[i] = event.item.data;
            this.remove(event.item.data);
            this.audio.pause();
            this.audio = new Audio();
            this.audio.src = 'assets/audio/trintrin.mp3';
            this.audio.load();
            // this.openDialog(true);
            this.audio.play();
            this.count = this.count + 1;

            if (this.count === this.answer.answer.length) {
                this.finish();
            }
        } else {
            this.audio.pause();
            this.audio = new Audio();
            this.audio.src = 'assets/audio/asygystykjasama.mp3';
            this.audio.load();
            // this.openDialog(true);
            this.audio.play();
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


    remove(object): void {
        this.answer.allTextRandom.splice(this.answer.allTextRandom.indexOf(object), 1);
    }
}

class Answer {
    allText: string[];
    allTextRandom: string[] = [];
    display: string[] = [];
    answer: string[];
}
