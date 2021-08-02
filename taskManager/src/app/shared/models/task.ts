export class Task {
    id: number;
    name: string;
    synopsis: string;
    text: string;
    createdBy: string;
    dueBy: Date;

    constructor(){
        this.id = -1;
        this.name = '';
        this.synopsis = '';
        this.text = '';
        this.createdBy = '';
        let now = new Date();
        this.dueBy = new Date();
    }

}