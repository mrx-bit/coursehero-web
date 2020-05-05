import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core'

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ms-language-drop-down',
    templateUrl: './language-drop-down.component.html',
    styleUrls: ['./language-drop-down.component.scss']
})
export class LanguageDropDownComponent implements OnInit {

    currentLang = 'ru';
    selectName = 'ru';

    langArray: any [] = [
        {
            /*img: 'assets/img/ru.png',*/
            name: 'KZ',
            value: 'kz'
        },
        {
            /*img: 'assets/img/ru.png',*/
            name: 'RU',
            value: 'ru'
        },
        {
            /*img: 'assets/img/en.png',*/
            name: 'EN',
            value: 'en'
        }

    ];

    constructor(
        public translate: TranslateService
    ) {
        // this.translate.use(this.langArray[0].value);

        /*this.translate.langs.push('kz');*/
        /*  console.log('translate', this.translate.langs);*/
    }

    ngOnInit() {
        // setTimeout(er => {
        //         this.setLang(this.langArray[0].value);
        //
        //     },100);
    }

    // setLang method is used to set the language into template.
    setLang(lang) {
        for (const data of this.langArray) {
            if (data.value === lang) {
                this.selectName = data.name;
                break;
            }
        }
        console.log(lang)
        this.translate.use(lang);
    }
}
