import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Aidar} from '../../core/models/aidar';
import {ServiceCommonConstant} from '../../../../../core/constant/service-common.constant';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-training-aidar',
    templateUrl: './training-aidar.component.html',
    styleUrls: ['./training-aidar.component.scss']
})
export class TrainingAidarComponent implements OnInit, OnDestroy{
    audio = new Audio();
    @Input() aidar: Aidar;
    baseUrl = ServiceCommonConstant.bbookModuleUrl;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

        this.audio.pause();
    }

    playAudio(audioId): void {
        this.audio.pause();
        this.audio = new Audio();
        this.audio.src = this.baseUrl + '/videos/test/' + audioId;
        this.audio.load();
        this.audio.play();
    }


}
