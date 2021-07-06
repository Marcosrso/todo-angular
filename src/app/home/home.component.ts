import { Component, OnInit } from '@angular/core';
import { takeLast } from 'rxjs/operators';
import { ILists } from '../app.component';
import { IToggleTaskEvent } from '../task-index/task-index.component';
import { IList, ITask, TaskService } from '../task-services.service';

export interface ITasks extends ITask {
  listColor: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks?: ITasks[];
  lists?: ILists[];
  selectedList?: IList;

  constructor(private TaskService: TaskService) { }

  ngOnInit(): void {
    this.getLists();
  }

  getLists (){
    this.TaskService.getLists().subscribe((allLists: IList[]) => {

      this.TaskService.getTasks().subscribe(allTasks => {
        this.tasks = allTasks.map(task => {
          return {
            id: task.id,
            title: task.title,
            listId: task.listId,
            status: task.status,
            listColor: allLists.find(list => list.id === task.listId)?.color || '#3276b1'
          }
        });

        const lists: ILists[] = allLists.map(list => ({
          id: list.id,
          title: list.title,
          color: list?.color || '#3276b1',
          tasksAmout: this.tasks?.filter(task => task.listId === list.id)?.length || 0,
        }))

        if(lists?.length){
          this.lists = lists;
          this.selectedList = this.lists[0];
        }

      })
    });
  }

  handleListOnClick(listId: string){
    console.log(listId)
    this.selectedList = this.lists?.find(list => list.id === listId);
    this.TaskService.getTasksByList(listId).subscribe((tasks) => {
      this.tasks = tasks.map(task => {
        return {
          id: task.id,
          title: task.title,
          listId: task.listId,
          status: task.status,
          listColor: this.lists?.find(list => list.id === task.listId)?.color || '#3276b1'
        }
      });;
    })
  }

  removeTask(taskId: string){
    console.log("removendo", taskId)
    this.TaskService.updateTaskStatus(taskId, "Deleted").subscribe((task: ITask) => {
      const taskIndex = this.tasks?.findIndex(taskToUpdate => taskToUpdate.id === taskId);

      if(this.tasks && typeof taskIndex === 'number' && taskIndex >= 0){
        console.log("removido")
        this.tasks.splice(taskIndex, 1);

        let listToUpdate = -1;

        if(this.lists){
          listToUpdate = this.lists.findIndex(list => list.id === task.listId);
        }
        console.log("Index",listToUpdate)
        if(listToUpdate >= 0 && this.lists?.length){
          this.lists[listToUpdate].tasksAmout = this.tasks.filter(taskToUpdate => taskToUpdate.listId === task.listId).length;
        }
      }
    })
  }

  toggleTaskStatus(task: IToggleTaskEvent){
    this.TaskService.updateTaskStatus(task.taskId, task.taskIsCompleted ? "Completed" : "Waiting").subscribe((task: ITask) => {
      const taskIndex = this.tasks?.findIndex(taskToUpdate => taskToUpdate.id === task.id);

      if(this.tasks && typeof taskIndex === 'number' && taskIndex >= 0){
        this.tasks[taskIndex].status = task.status;
      }
    })
  }

}
