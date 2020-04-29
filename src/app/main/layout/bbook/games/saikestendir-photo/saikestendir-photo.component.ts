import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';
import {AidarService} from '../../core/services/aidar.service';
import {MatDialog} from '@angular/material';
import {Aidar} from '../../core/models/aidar';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-saikestendir-photo',
    templateUrl: './saikestendir-photo.component.html',
    styleUrls: ['./saikestendir-photo.component.scss']
})
export class SaikestendirPhotoComponent implements OnInit, OnDestroy {

    @Input() aidar: Aidar;
    audio = new Audio();
    baseUrl = ServiceCommonConstant.bbookModuleUrl;
    private _unsubscribeAll: Subject<any>;
    leftSide: any [] = [];
    rightSide: any [] = [];
    answer: string[] = [];
    left: any;
    right: any;

    step = 0;
    previouslyChecked: any;
    answerCount = 0;

    constructor(
        private _service: AidarService,
        public dialog: MatDialog
    ) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
        const aidarLeftSide = this.aidar.saikestendirPhoto.leftSideImages;
        const aidarRightSide = this.aidar.saikestendirPhoto.rightSideImages;

        this.answerCount = aidarLeftSide.length + aidarRightSide.length;

        for (let i = 0; i < aidarLeftSide.length; i++) {
            const pos = Math.floor(Math.random() * aidarLeftSide.length);
            if (this.leftSide.indexOf(aidarLeftSide[pos]) === -1) {
                const object = {
                    position: i,
                    side: 'left',
                    image: aidarLeftSide[pos],
                    checked: false,
                    finished: false
                };
                this.leftSide.push(object);
            } else {
                i--;
            }
        }

        for (let i = 0; i < aidarRightSide.length; i++) {
            const pos = Math.floor(Math.random() * aidarRightSide.length);
            if (this.rightSide.indexOf(aidarRightSide[pos]) === -1) {
                const object = {
                    position: i,
                    side: 'right',
                    image: aidarRightSide[pos],
                    checked: false,
                    finished: false
                };
                this.rightSide.push(object)
            } else {
                i--;
            }
        }

        console.log('leftSide', this.leftSide);
        console.log('rightSide', this.rightSide);

    }

    check(obj: any): void {

        if (obj.finished === true) {
            return;
        }

        if (obj.checked === false && this.step % 2 === 0) {
            this.previouslyChecked = obj;
        }

        if (obj.side === 'left') {
            for (let i = 0; i < this.leftSide.length; i++) {
                if (obj === this.leftSide[i]) {
                    console.log('================');
                    console.log('obj', obj);
                    console.log('this.leftSide[i]', this.leftSide[i]);
                    console.log('================');
                    this.leftSide[i].checked = !this.leftSide[i].checked;

                    if (this.leftSide[i].checked === false) {
                        this.step--;
                    } else {
                        this.step++;
                    }
                }
            }
        } else {
            for (let i = 0; i < this.rightSide.length; i++) {
                if (obj === this.rightSide[i]) {
                    console.log('================');
                    console.log('obj', obj);
                    console.log('this.rightSide[i]', this.rightSide[i]);
                    console.log('================');
                    this.rightSide[i].checked = !this.rightSide[i].checked;

                    if (this.rightSide[i].checked === false) {
                        this.step--;
                    } else {
                        this.step++;
                    }

                }
            }
        }

        console.log('After the check');
        console.log('previou', this.previouslyChecked);
        console.log('current', obj);

        if (this.previouslyChecked.position === obj.position && this.previouslyChecked.checked === obj.checked &&
            (this.previouslyChecked.side === 'left' && obj.side === 'right' || this.previouslyChecked.side === 'right' && obj.side === 'left')) {

            if (this.step === this.answerCount) {
                this.finish();
            } else {
                this.succesAudio();
            }

            // TODO

            if (this.previouslyChecked.side === 'left') {

            } else {

            }

        }


    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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

    finish() {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = 'assets/audio/T6.mp3';
        this.audio.load();
        this.openDialog(true);
        this.audio.play();
    }

    succesAudio() {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = 'assets/audio/trintrin.mp3';
        this.audio.load();
        // this.openDialog(true);
        this.audio.play();
    }
}

class Answer {
    lPos: number;
    lChecked: boolean;
    rPos: number;
    rChecked: boolean;
}
