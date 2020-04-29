import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop } from '@angular/cdk/drag-drop';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {Match} from '../../core/models/games/match';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
    match: Match[] = [];
    audio = new Audio();
    count = 0;
    @Input() aidar: Aidar;
    idList = [];
    anserIdList = [];
    randomList: number[] = [];
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


    drop(event: CdkDragDrop<string[]>, i) {
        if (this.aidar.match[i].imageId === event.item.data) {
            this.aidar.match[i].answerImage = event.item.data;
            this.audio.pause();
            this.audio = new Audio();
            this.audio.src = 'assets/audio/trintrin.mp3';
            this.audio.load();
            // this.openDialog(true);
            this.audio.play();
            this.count = this.count + 1;

            if (this.count === this.aidar.match.length) {
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

    getGame(): void {
        this._service.getById(this.aidar.id)
            .pipe()
            .subscribe(response => {
                this.aidar = response;
                this.match = this.aidar.match;
                for (let i = 0; i < this.aidar.match.length; i++) {
                    this.idList.push(this.aidar.match[i].imageId + i);
                    this.anserIdList.push(this.aidar.match[i].imageId);
                }
                for (let i = 0; i < this.aidar.match.length; i++) {
                    let ran = Math.floor(Math.random() * this.aidar.match.length);
                    if (this.randomList.indexOf(ran) === -1) {
                        this.randomList.push(ran);
                    } else {
                        i--;
                    }
                }
                this.idList = [...this.idList, ...this.anserIdList];
            });
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
