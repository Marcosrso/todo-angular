import { Component } from '@angular/core';
import { IToggleTaskEvent } from './task-index/task-index.component';
import { TaskService, ITask, IList } from './task-services.service';

export interface ILists extends IList {
  tasksAmout: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Todo App';

  displayedList: IList | undefined;
  tasks: ITask[] | undefined;
  lists: ILists[] = [{
    id: '',
    title: 'Todas as tarefas',
    color: '#3276b1',
    tasksAmout: 0,
  }];
  tasksSortedByList: ITask[] | undefined;

  constructor(private TaskService:TaskService ) { }

  ngOnInit() {
    this.getTasks();
    this.getList()
  }

  getTasks () {
    this.TaskService.getTasks().subscribe((tasks: ITask[]) => {
      this.tasks = [...tasks].filter(task => task.status === 'Waiting' || task.status === 'Completed')
      if(this.tasks?.length){
        this.tasksSortedByList = [...this.tasks];
      }
    });
  }

  getList (){
    this.TaskService.getList().subscribe((data: IList[]) => {
      const allList:IList[] = [...data];
      const lists:ILists[] = allList.map(list => ({
        id: list.id,
        title: list.title,
        color: list?.color || '#3276b1',
        tasksAmout: this.tasks?.length ? this.tasks.filter(task => task.listId === list.id).length : 0,
      }))
      this.lists[0].tasksAmout = this.tasks?.length || 0;
      this.lists = this.lists?.concat(lists);
      this.displayedList = this.lists[0];
    });
  }

  removeTask(taskId: string){
    this.TaskService.updateTaskStatus(taskId, "Deleted").subscribe((task: ITask) => {
      const taskId = this.tasksSortedByList?.findIndex(taskToUpdate => taskToUpdate.id === task.id);
      if(this.tasksSortedByList && typeof taskId === 'number' && taskId >= 0){
        this.tasksSortedByList.splice(taskId,1);
      }
    })
  }

  toggleTaskStatus(task: IToggleTaskEvent){
    this.TaskService.updateTaskStatus(task.taskId, task.taskIsCompleted ? "Completed" : "Waiting").subscribe((task: ITask) => {
      const taskId = this.tasksSortedByList?.findIndex(taskToUpdate => taskToUpdate.id === task.id);
      if(this.tasksSortedByList && typeof taskId === 'number' && taskId >= 0){
        this.tasksSortedByList[taskId].status = task.status;
      }
    })
  }

  filterTaskCategory(listId: string){
    if(listId.length){
      this.displayedList = this.lists.find(list => list.id === listId) || this.lists[0];
    }else{
      this.displayedList = this.lists[0];
    }
    if(this.tasks?.length){
      this.tasksSortedByList = listId.length ? this.tasks?.filter(task => task.listId === listId) : this.tasks;
    }
  }
}
