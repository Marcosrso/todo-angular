import { Component } from '@angular/core';
import { TaskService, ITask, ICategory } from './task-services.service';

interface ICategories extends ICategory {
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
    id: 4,
    listId: 1,
    title: 'Tetste',
  };
  tasks: ITask[] | undefined;
  categories: ICategories[] | undefined;

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
    this.TaskService.getCategories().subscribe((data: ICategory[]) => {
      const categoryList:ICategory[] = [...data];
      const categories:ICategories[] = categoryList.map(category => ({
        id: category.id,
        title: category.title,
        tasksAmout: this.tasks?.length ? this.tasks.filter(task => task.listId === category.id).length : 0,
      }))
      categories.unshift({
        id: 0,
        title: 'Todas as tarefas',
        tasksAmout: this.tasks?.length ? this.tasks.length : 0,
      })
      this.categories = categories;
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
