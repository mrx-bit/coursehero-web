import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';

@Component({
    selector: 'app-put-letter',
    templateUrl: './put-letter.component.html',
    styleUrls: ['./put-letter.component.scss']
})
export class PutLetterComponent implements OnInit {
    @Input() aidar: Aidar;
    idList = ['all'];
    show: ShowGame = new ShowGame();
    letters = [];
    randomList = [];
    audio = new Audio();
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

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

    getGame(): void {
        this._service.getById(this.aidar.id)
            .pipe()
            .subscribe(response => {
                this.aidar = response;
                this.show.text = this.aidar.putLetters.text.split('');
                this.show.answer = this.aidar.putLetters.text.split('');
                const count = Math.floor(Math.random() * this.show.text.length / 3 + 1) + 1;
                for (let i = 0; i < count; i++) {
                    const ran = Math.floor(Math.random() * this.show.text.length);
                    this.aidar.putLetters.extraLetters.push(this.show.text[ran]);
                    this.show.text[ran] = '-';
                }
                for (let i = 0; i < this.show.text.length; i++) {
                    this.idList.push(i.toString());
                }
                for (let i = 0; i < this.aidar.putLetters.extraLetters.length; i++) {
                    const ran = Math.floor(Math.random() * this.aidar.putLetters.extraLetters.length);
                    if (this.randomList.indexOf(ran) === -1) {
                        this.randomList.push(ran);
                            this.letters.push(this.aidar.putLetters.extraLetters[ran]);
                    } else {
                        i--;
                    }
                }
            });
    }

    drop(event: CdkDragDrop<any[]>, i): void {
        if (this.show.text[i] === '-' && this.show.answer[i] === event.item.data) {
            this.show.text[i] = event.item.data;
            // this.remove(event.item.data);
        }
    }

    remove(object): void {
        this.letters.splice(this.letters.indexOf(object), 1);
    }
}

class ShowGame {
    text: any[];
    answer: any[];

    constructor() {
        this.text = [];
        this.answer = [];
    }
}