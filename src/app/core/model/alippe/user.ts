import {UserRoleOrgMap} from './userRoleOrgMap';

export class User {
    public id: string;
    public active: boolean;
    public signupToken: string;
    public username: string;
    public password: string;
    public email: string;
    public idn: string;
    public name: string;
    public surname: string;
    public avatarId: string;
    public birthday: Date;
    public sex: string;
    public userType: number;
    public mobilePhone: string;
    public userRoleOrgMapList: UserRoleOrgMap[];


}
