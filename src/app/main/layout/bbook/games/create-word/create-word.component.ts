import {Component, Input, OnInit} from '@angular/core';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {MatDialog} from '@angular/material';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';

@Component({
    selector: 'app-create-word',
    templateUrl: './create-word.component.html',
    styleUrls: ['./create-word.component.scss']
})
export class CreateWordComponent implements OnInit {

    @Input() aidar: Aidar;
    location = 0;
    all = [];
    all2 = [];
    answers = [];
    check: Check = new Check;
    audio = new Audio();
    baseUrl = ServiceCommonConstant.bbookModuleUrl;
    constructor(private _service: AidarService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
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
                this.all = [...this.all, ...this.aidar.createWord.extraLetters];
                this.answers = this.aidar.createWord.answers;
                this.all2.push(this.aidar.createWord.mainLetter);
                for (let i = 0; i < this.aidar.createWord.extraLetters.length; i++) {
                    this.all2.push('-');
                }
            });
    }


    finish() {
        console.log('FINISH');
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = 'assets/audio/trintrin.mp3';
        this.audio.load();
        this.audio.play();
    }

   /* playAudio1() {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = 'assets/audio/T6.mp3';
        this.audio.load();
        this.openDialog(true);
        this.audio.play();
    }*/


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


    drop(): void {
        if (this.check.second !== '' && this.check.first !== '') {
            const index = this.answers.indexOf(this.check.first + this.check.second);
            if (index !== -1 && this.all2.indexOf(this.check.first + this.check.second) === -1) {

                if (this.check.secondIndex === 0) {
                    this.location = this.check.firstIndex;
                } else {
                    this.location = this.check.secondIndex;
                }
                this.location = this.location + 1;

                if (this.all2[this.location] === '-') {
                    // console.log('location ' + this.location);
                    this.all2[this.location] = this.check.first + this.check.second;
                }
            }this.finish();
            this.check = new Check();

        }
    }

    setCheck(i: number, type: string): void {
        if (this.check.first === '' && type === 'all') {
            this.check.first = this.all[i];
            this.check.firstIndex = i;
        } else if (this.check.first === '' && type === 'all2' && i === 0) {
            this.check.first = this.all2[i];
            this.check.firstIndex = i;
        } else if (this.check.second === '' && type === 'all') {
            this.check.second = this.all[i];
            this.check.secondIndex = i;
        } else if (this.check.second === '' && type === 'all2' && i === 0) {
            this.check.second = this.all2[i];
            this.check.secondIndex = i;
        }
        this.drop();

    }
}

class Check {
    first: any;
    second: any;
    firstIndex: any;
    secondIndex: any;

    constructor() {
        this.first = '';
        this.second = '';
        this.firstIndex = '';
        this.secondIndex = '';
    }
}
