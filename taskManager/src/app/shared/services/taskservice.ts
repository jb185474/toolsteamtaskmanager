import { Injectable } from "@angular/core";
import { Task } from "../models/task";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class TaskService {

    constructor(private http: HttpClient) {
    }

    public globalTasks: Task[] = [];


    //Add Task
    public addTask(taskModel: Task  ): Observable<Response>{
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'}),
            params: new HttpParams().set('action', 'addTask')
        };
        const requestBody = JSON.stringify(taskModel);
        return this.http.post<Response>('http://localhost:8080/tm', requestBody, httpOptions);
        //this.globalTasks.push(taskModel);
    }

    public getAllTasks(): Observable<Task[]>{
        return this.http.get<Task[]>('http://localhost:8080/getAllRecords');
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