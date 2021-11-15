import { Injectable } from "@angular/core";
import { Task } from "../models/task";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class TaskService {

    constructor(private http: HttpClient) {
    }

    public globalTasks: Task[] = [];


    //Add Task
    public addTask(taskModel: Task  ){
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}),
            params: new HttpParams().set('action', 'addTask')
        };
        const requestBody = encodeURIComponent(JSON.stringify(taskModel));
        return this.http.post<Response>('http://localhost:8080/tm', requestBody, httpOptions);
        //this.globalTasks.push(taskModel);
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