import { Component } from '@angular/core';
import { TaskService, ITask, IList } from './task-services.service';

interface ILists extends IList {
  tasksAmout: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'todo';
  task: ITask | undefined = {
    id: '',
    listId: '',
    title: '',
  };
  tasks: ITask[] | undefined;
  lists: ILists[] | undefined;

  constructor(private TaskService:TaskService ) { }

  getTasks () {
    this.TaskService.getTasks().subscribe((data: ITask[]) => {
      this.tasks = [...data]
    });
  }

  clearTask(){
    this.task = undefined;
  }

  getCategories (){
    this.TaskService.getCategories().subscribe((data: IList[]) => {
      const allList:IList[] = [...data];
      const lists:ILists[] = allList.map(category => ({
        id: category.id,
        title: category.title,
        tasksAmout: this.tasks?.length ? this.tasks.filter(task => task.listId === category.id).length : 0,
      }))
      lists.unshift({
        id: '',
        title: 'Todas as tarefas',
        tasksAmout: this.tasks?.length ? this.tasks.length : 0,
      })
      this.lists = lists;
    });
  }

  ngOnInit() {
    this.getTasks();
    this.getCategories()
  }

  addTask() {
    if(this.task){
      this.TaskService.insertTask(this.task).subscribe((task: ITask) => {
        this.clearTask();
        this?.tasks?.push(task);
      })
    }
  }
}
