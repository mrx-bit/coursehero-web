import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-letters',
    templateUrl: './letters.component.html',
    styleUrls: ['./letters.component.scss']
})
export class LettersComponent implements OnInit {
    @Input() aidar: Aidar;
    idList = ['all'];
    oldLetters: any[] = [];
    audio = new Audio();
    letters: any[] = [];
    randomList: any [] = [];
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    countAnswer = 0;



    playAudio(path1): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + path1;
        this.audio.load();
        this.audio.play();

    }

    constructor(private _service: AidarService,
                public dialog: MatDialog) {

    }

    ngOnInit(): void {
        this.getGame();

        this.countAnswer = this.aidar.boxSorting.length;
    }

    drop(event: CdkDragDrop<number[]>, i): void {
        if (this.aidar.boxSorting[i].letters.indexOf(event.item.data) !== -1) {
            this.remove(event.item.data);
        }
    }

    finish() {
        console.log('FINISH');
        this.audio.pause();
            this.audio = new Audio();
            this.audio.src = 'assets/audio/T6.mp3';
            this.audio.load();
            this.openDialog(true);
            this.audio.play();
    }

    playAudio1(): void {
        this.audio.pause();
        const audio = new Audio();
        this.audio.src =  'assets/audio/trintrin.mp3';
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


    getGame(): void {
        this._service.getById(this.aidar.id)
            .pipe()
            .subscribe(response => {
                this.aidar = response;
                for (let i = 0; i < this.aidar.boxSorting.length; i++) {
                    this.oldLetters = [...this.oldLetters, ...this.aidar.boxSorting[i].letters];
                    this.idList.push(this.aidar.boxSorting[i].code);
                }
                for (let i = 0; i < this.oldLetters.length; i++) {
                    const ran = Math.floor(Math.random() * this.oldLetters.length);
                    if (this.randomList.indexOf(ran) === -1) {

                        this.randomList.push(ran);

                        this.letters.push(this.oldLetters[ran]);

                    } else {
                        i--;
                    }
                }
            });
    }

    remove(object): void {
        this.letters.splice(this.letters.indexOf(object), 1);

        if (this.letters.length === 0) {
            this.finish()
        } else {
            this.playAudio1();
        }
    }
}
