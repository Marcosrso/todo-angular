import { Component } from '@angular/core';
import { TaskService, ITask } from './task-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'todo';
  tasks: ITask[] | undefined;

  constructor(private TaskService:TaskService ) { }


  ngOnInit() {
    this.TaskService.getData().subscribe((data: ITask[]) => {
      this.tasks = [...data]
    });
  }
}
