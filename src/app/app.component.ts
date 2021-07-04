import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  @ViewChild('categoriesWrapper') categoriesWrapper: ElementRef |  undefined;

  title = 'Todo App';
  listColors: {name:string, value: string, valueWhenSelected: string}[] = [
    {name:'Red', value: '#d2322d',valueWhenSelected: '#ac2929'},
    {name:'Yellow', value: '#f0ad4e', valueWhenSelected: '#eea236'},
    {name:'Aqua', value: '#5bc0de', valueWhenSelected: '#46b8da'},
    {name:'Green', value: '#5cb85c', valueWhenSelected: '#4cae4c'},
    {name:'Blue', value: '#3276b1', valueWhenSelected: '#357ebd'}
  ]

  newListForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(4)]),
    color: new FormControl('#3276b1',Validators.required)
  })
  newTaskForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(4)]),
    listId: new FormControl('',Validators.required)
  })

  tasks: ITask[] | undefined;
  lists: ILists[] = [{
    id: '',
    title: 'Todas as tarefas',
    color: this.listColors.find((color) => color.name === 'Blue')?.value || '#3276b1',
    tasksAmout: 0,
  }];

  constructor(private TaskService:TaskService ) { }

  getTasks () {
    this.TaskService.getTasks().subscribe((data: ITask[]) => {
      this.tasks = [...data]
    });
  }

  clearListForm(){
    this.newListForm.reset();
  }

  clearTaskForm(){
    this.newTaskForm.reset();
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
    });
  }

  ngOnInit() {
    this.getTasks();
    this.getList()
  }

  onSubmitTaskForm(){
    const list = this.newTaskForm.value;
    this.TaskService.insertTask(list.title,list.listId).subscribe((task: ITask) => {
      this?.tasks?.push(task);
      this.clearTaskForm();
    })
  }

  onSubmitListForm(){
    const list = this.newListForm.value;
    this.TaskService.insertList(list.title, list.color).subscribe((list: IList) => {
      this?.lists?.push({
        id: list.id,
        title: list.title,
        tasksAmout: this.tasks?.length ? this.tasks.filter(task => task.listId === list.id).length : 0
      });
      this.clearListForm();
    })
  }

  scrollCategoriesToTheLeft() {
    if(this.categoriesWrapper){
      this.categoriesWrapper.nativeElement?.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  }

  scrollCategoriesToTheRight() {
    if(this.categoriesWrapper){
      this.categoriesWrapper.nativeElement?.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  }
}
