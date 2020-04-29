import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';

@Component({
    selector: 'app-buyn',
    templateUrl: './buyn.component.html',
    styleUrls: ['./buyn.component.scss']
})
export class BuynComponent implements OnInit {
    @Input() aidar: Aidar;
    randomList = [];
    games: Game[] = [];
    game: Game;
    audio = new Audio();
    allText: any [] = [];
    allRandomText: any [] = [];
    idList: any[] = ['all'];
    baseUrl = ServiceCommonConstant.bbookModuleUrl;
    count = 0;

    constructor(private _service: AidarService) {
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


    playAudioWinStage(): void {
        this.audio.pause();
        const audio = new Audio();
        this.audio.src =  'assets/audio/trintrin.mp3';
        this.audio.load();
        /*  this.openDialog(true);*/
        this.audio.play();
    }

    playAudioWin(): void {
        this.audio.pause();
        const audio = new Audio();
        this.audio.src =  'assets/audio/T6.mp3';
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

    getGame(): void {
        this._service.getById(this.aidar.id)
            .pipe()
            .subscribe(response => {
                this.aidar = response;
                for (let i = 0; i < this.aidar.buyn.length; i++) {
                    this.game = new Game();
                    this.allText = [...this.allText, ...this.aidar.buyn[i].text, ...this.aidar.buyn[i].extraText];
                    this.game.answer = this.aidar.buyn[i].text;
                    this.game.image = this.aidar.buyn[i].imageId;
                    for (let j = 0; j < this.aidar.buyn[i].text.length; j++) {
                        this.game.display.push('-');
                        this.game.idList.push(i.toString() + j.toString());
                        this.idList.push(i.toString() + j.toString());

                    }
                    this.games.push(this.game);
                }
                for (let i = 0; i < this.allText.length; i++) {
                    const ran = Math.floor(Math.random() * this.allText.length);
                    if (this.randomList.indexOf(ran) === -1) {
                        this.randomList.push(ran);
                        this.allRandomText.push(this.allText[ran]);
                    } else {
                        i--;
                    }
                }
            });
    }

    drop(event: CdkDragDrop<any[]>, j, i): void {
        if (this.games[j].display[i] === '-' && this.games[j].answer[i] === event.item.data) {
            this.games[j].display[i] = this.games[j].answer[i];
            this.playAudioWinStage();
            this.count = this.count + 1;
            if (this.count === this.aidar.buyn[0].text.length + this.aidar.buyn[1].text.length) {
                this.playAudioWin();
            }
            this.allRandomText.splice(this.allRandomText.indexOf(event.item.data), 1);

        } else {
            this.errorAudio();
        }  {

        }
    }

}

class Game {
    idList: any[] = [];
    display: string[] = [];
    answer: string[];
    image: any;
}
