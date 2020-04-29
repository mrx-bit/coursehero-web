import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {SoundsConstant} from '../../core/constants/sounds.constant';
import {AidarService} from '../../core/services/aidar.service';
import {Aidar} from '../../core/models/aidar';
import {AnswerDialogComponent} from '../answer-dialog/answer-dialog.component';
import {MatDialog} from '@angular/material';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';

export class SyllableWord {
    id: any;
    displayShow = Array<Syllable>();
    value: any[];
    done: false;

}

export class Syllable {
    value: any;
    correct: boolean;
}

@Component({
    selector: 'app-syllable-constructor',
    templateUrl: './syllable-constructor.component.html',
    styleUrls: ['./syllable-constructor.component.scss']
})
export class SyllableConstructorComponent implements OnInit {
    @Input() aidar: Aidar;

    evens = [];
    syllables = [];
    words = [];
    bookId: any;
    db: any;
    audio = new Audio();
    baseUrl = ServiceCommonConstant.bbookModuleUrl;
    @ViewChild('mainDiv', {static: false}) d1: ElementRef;


    constructor(private _service: AidarService,
                public dialog: MatDialog) {}

    ngOnInit(): void {
        this.fetchSyllables(this.aidar.id);
    }


    playAudio(path1): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + path1;
        this.audio.load();
        this.audio.play();

    }

    fetchSyllables(aidarId): void {
        this._service.getById(aidarId).pipe().subscribe((response: Aidar) => {
            this.db = response.syllableConstructors;
            // this.bookId = response.bookId;

            this.db.forEach((items, index) => {
                const sw = new SyllableWord();
                sw.id = index;
                sw.value = items.syllables;
                sw.done = false;
                for (const val of items.syllables) {
                    const displayShows = new Syllable();
                    let str = '';
                    for (let i = 0; i < val.length; i++) {
                        str += ' - ';
                    }
                    displayShows.value = str;
                    displayShows.correct = false;
                    sw.displayShow.push(displayShows);
                }

                this.words.push(sw);
                items.syllables.forEach(value => {
                    this.syllables.push(value);
                });
            });

            const unique = this.syllables.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            this.syllables = this.shuffle(unique);

            for (let i = 0; i < this.words.length; i++) {
                for (let j = 0; j < this.words[i].displayShow.length; j++) {
                    this.evens.push(i + '-' + j);
                }
            }
        }, error => {
            console.log('Class: SyllableConstructorComponent, Function: fetchSyllables, Line 48 (): ', error);
        });
    }

    drop(event: CdkDragDrop<any[]>, i, j): void {
        if (!this.words[i].done && event.item.data === this.words[i].value[j]) {
            this.words[i].displayShow[j].value = event.item.data;
            this.words[i].displayShow[j].correct = true;
            this.playAudio1(SoundsConstant.CORRECT);
            const correctWord = this.words[i].displayShow.filter(item => {
                return item.correct;
            });
            this.words[i].done = correctWord.length === this.words[i].displayShow.length;

            if (this.words[i].done) {
                // is the game finished ?
                const finished = this.words.filter(item => {
                    return item.done;
                });

                if (finished.length === this.words.length) {
                    console.log('GAME FINISHED !!!!');
                    this.openDialog(true);
                }
            }
        } else {
            this.playAudio1(SoundsConstant.INCORRECT);
        }
    }

    playAudio1(state): void {
        const audio = new Audio();
        switch (state) {
            case SoundsConstant.CORRECT:
                audio.src = SoundsConstant.CORRECT_SOUND;
                break;
            case SoundsConstant.INCORRECT:
                audio.src = SoundsConstant.INCORRECT_2_SOUND;
                break;
        }
        audio.load();
        audio.play();
    }

    shuffle(arr): any {
        let i,
            j,
            temp;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
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
