export class Task {
    _id: number;
    name: string;
    synopsis: string;
    text: string;
    createdBy: string;
    dueBy: Date;

    constructor(){
        this._id = -1;
        this.name = '';
        this.synopsis = '';
        this.text = '';
        this.createdBy = '';
        this.dueBy = new Date();
    }

}