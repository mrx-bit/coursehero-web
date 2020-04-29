import {Component, Input, OnInit} from '@angular/core';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';
import {MatDialog} from '@angular/material';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';

@Component({
    selector: 'app-find-game',
    templateUrl: './find-game.component.html',
    styleUrls: ['./find-game.component.scss']
})
export class FindGameComponent implements OnInit {
    color = 'primary';
    @Input() aidar: Aidar;
    audio = new Audio();
    games: Game[] = [];
    game: Game;
    check: Check = new Check();
    lowers: any[] = [];
    lowersRandom: any[] = [];
    uppers: any[] = [];
    uppersRandom: any[] = [];
    randomList = [];
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    checkCount = 0;

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
                console.log(response);
                this.aidar = response;
                for (let i = 0; i < this.aidar.find.letters.length; i++) {
                    this.game = new Game();
                    this.game.answer = this.aidar.find.letters[i];
                    this.game.lower = this.aidar.find.letters[i].split('')[1];
                    this.lowers.push(this.game.lower);
                    this.game.upper = this.aidar.find.letters[i].split('')[0];
                    this.uppers.push(this.game.upper);
                    this.games.push(this.game);
                }

                for (let i = 0; i < this.lowers.length; i++) {
                    const ran = Math.floor(Math.random() * this.lowers.length);
                    if (this.randomList.indexOf(ran) === -1) {
                        this.randomList.push(ran);
                        this.lowersRandom.push(this.lowers[ran]);
                    } else {
                        i--;
                    }
                }
                this.randomList = [];
                for (let i = 0; i < this.uppers.length; i++) {
                    const ran = Math.floor(Math.random() * this.uppers.length);
                    if (this.randomList.indexOf(ran) === -1) {
                        this.randomList.push(ran);
                        this.uppersRandom.push(this.uppers[ran]);
                    } else {
                        i--;
                    }
                }
            });
    }



    playAudio1(): void {
        this.audio.pause();
        const audio = new Audio();
        this.audio.src =  'assets/audio/trintrin.mp3';
        this.audio.load();
      /*  this.openDialog(true);*/
        this.audio.play();
    }


    errorAudio(): void {
        this.audio.pause();
        const audio = new Audio();
        this.audio.src =  'assets/audio/asygystykjasama.mp3';
        this.audio.load();
        /*  this.openDialog(true);*/
        this.audio.play();
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



    setUpper(i): void {
        if (this.check.upper === '') {
            this.check.upper = this.uppersRandom[i];
            this.games[i].colorUpper = 'primary';
            this.check.upperIndex = i;
            this.checkAnswer();

        }
    }




    setLower(i): void {
        if (this.check.lower === '') {
            this.check.lower = this.lowersRandom[i];
            this.games[i].colorLower = 'primary';
            this.check.lowerIndex = i;
            this.checkAnswer();

        }
    }

    checkAnswer(): void {
        if (this.check.upper !== '' && this.check.lower !== '') {
            let check = false;

            for (let i = 0; i < this.games.length; i++) {
                if (this.games[i].answer === (this.check.upper + this.check.lower)) {
                    this.games[i].showAnswer = true;

                    check = true;

                    break;
                }

            }
            if (check) {
                this.games[this.check.lowerIndex].colorLower = 'accent';
                this.games[this.check.upperIndex].colorUpper = 'accent';
                this.check = new Check();
                this.checkCount++;
                if (this.checkCount === this.aidar.find.letters.length) {
                    this.finish();
                } else {
                    this.playAudio1();
                }
            } else {
                this.games[this.check.lowerIndex].colorLower = 'warn';
                this.games[this.check.upperIndex].colorUpper = 'warn';
                this.errorAudio();
                setTimeout(s => {
                    this.games[this.check.lowerIndex].colorLower = 'basic';
                    this.games[this.check.upperIndex].colorUpper = 'basic';
                }, 1000);
            }
        }
    }
}

class Game {
    answer: any;
    upper: any;
    lower: any;
    showAnswer = false;
    colorUpper = 'basic';
    colorLower = 'basic';
}

class Check {
    lower: any;
    upper: any;
    lowerIndex: any;
    upperIndex: any;

    constructor() {
        this.lower = '';
        this.upper = '';
        this.lowerIndex = '';
        this.upperIndex = '';
    }
}
