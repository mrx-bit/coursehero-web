import {Messages} from './messages';
import {User} from '../../../../core/model/alippe/user';

export class Chats {

    constructor(
        public id?: string,
        public from?: string,
        public fromUser?: User,
        public photo?: string,
        public userId?: string,
        public user?: User,
        public messages?: Messages[]
    ) {}

}
