export class UserTypeConstant {
    public IS_STUDENT: Type;
    public IS_TEACHER: Type;
    public IS_PARENT: Type;
    public IS_OTHER: Type;
    public list: Type[] = [];

    constructor() {
        this.IS_STUDENT = {'key': 0, 'name': 'student'};
        this.IS_TEACHER = {'key': 1, 'name': 'teacher'};
        this.IS_PARENT = {'key': 2, 'name': 'parent'};
        this.IS_OTHER = {'key': 3, 'name': 'other'};
        this.list.push(this.IS_STUDENT);
        this.list.push(this.IS_TEACHER);
        this.list.push(this.IS_PARENT);
        this.list.push(this.IS_OTHER);
    }
}

class Type {
    public key: number;
    public name: string;
}
