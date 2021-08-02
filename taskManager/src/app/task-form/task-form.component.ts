import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../shared/models/task';
import { TaskService } from '../shared/services/taskservice';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']

})
export class TaskFormComponent implements OnInit {

  taskManagerTask: FormGroup = this.fb.group({});
  
  model: Task = new Task();
  savedTasks: Task[] = Array<Task>();
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskManagerTask = this.fb.group({
      taskName: [this.model.name],
      taskSynopsis: [this.model.synopsis],
      taskText: [this.model.text],
      dueDateDay: [this.model.dueBy.getDate],
      dueDateMonth: [this.model.dueBy.getMonth],
      dueDateYear: [this.model.dueBy.getFullYear]
    });
  }

  onSubmit(){
    let currentModel = new Task();
    currentModel.name = this.taskName?.value;
    currentModel.synopsis = this.taskSynopsis?.value;
    currentModel.text = this.taskText?.value;
    
    let theDate = new Date();
    if(this.dueDateDay){
      theDate.setDate(this.dueDateDay.value);
    }
    if(this.dueDateMonth){
      theDate.setMonth(this.dueDateMonth.value);
    }
    if(this.dueDateYear){
      theDate.setFullYear(this.dueDateYear.value);
    }

    theDate.setHours(0);
    theDate.setMinutes(0);
    theDate.setSeconds(0);
    
    currentModel.dueBy = theDate;

    if(this.savedTasks.length > 0){
      currentModel.id = this.savedTasks[this.savedTasks.length-1].id + 1;
    }
    else{
      currentModel.id = 1;
    }
    
    
    this.savedTasks.push(currentModel);
    //this.savedTasks = this.taskService.globalTasks;
    console.log("submitted");
  }

  removeTaskId(task: Task){
    //this.taskService.removeTask(task);
    const index = this.getTaskIndex(task.id);
    this.savedTasks.splice(index,1);
  }

  getTaskIndex(taskId:number): number{
    return this.savedTasks.findIndex(element => element.id == taskId)
}


  get taskName() {
      return this.taskManagerTask.get('taskName');
  }

  get taskSynopsis() {
      return this.taskManagerTask.get('taskSynopsis');
  }

  get taskText() {
      return this.taskManagerTask.get('taskText');
  }

  get dueDateMonth() {
    return this.taskManagerTask.get('dueDateMonth');
}

get dueDateDay() {
  return this.taskManagerTask.get('dueDateDay');
}

get dueDateYear() {
  return this.taskManagerTask.get('dueDateYear');
}

}
