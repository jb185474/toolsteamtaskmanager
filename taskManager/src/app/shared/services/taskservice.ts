import { Injectable } from "@angular/core";
import { Task } from "../models/task";

@Injectable({
    providedIn: 'root'
  })
export class TaskService {

    public globalTasks: Task[] = [];


    //Add Task
    addTask(taskModel: Task  ){
        this.globalTasks.push(taskModel);
    }

    //Remove Task
    removeTask(taskModel: Task ){
        
        const index = this.getTaskIndex(taskModel.id)
        delete this.globalTasks[index];
    }

    //Modify Task
    modifyTask(id: number, taskModel: Task  ){
        const index = this.getTaskIndex(taskModel.id)
        this.globalTasks[index] = taskModel;
    }

    getTaskIndex(taskId:number): number{
        return this.globalTasks.findIndex(element => element.id = taskId)
    }

}