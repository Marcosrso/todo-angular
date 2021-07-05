import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IList, TaskService } from '../task-services.service';

@Component({
  selector: 'app-list-register',
  templateUrl: './list-register.component.html',
  styleUrls: ['./list-register.component.css']
})
export class ListRegisterComponent {

  newListForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(4)]),
    color: new FormControl('#3276b1',Validators.required)
  })
  listColors: {name:string, value: string, valueWhenSelected: string}[] = [
    {name:'Red', value: '#d2322d',valueWhenSelected: '#ac2929'},
    {name:'Yellow', value: '#f0ad4e', valueWhenSelected: '#eea236'},
    {name:'Aqua', value: '#5bc0de', valueWhenSelected: '#46b8da'},
    {name:'Green', value: '#5cb85c', valueWhenSelected: '#4cae4c'},
    {name:'Blue', value: '#3276b1', valueWhenSelected: '#357ebd'}
  ]
  @Output() deleteTaskOnClick: EventEmitter<string> = new EventEmitter<string>();

  constructor(private TaskService: TaskService) { }

  clearListForm(){
    this.newListForm.reset({
      title: '',
      color: '#3276b1'
    });
  }

  onSubmitListForm(){
    const list = this.newListForm.value;
    this.TaskService.insertList(list.title, list.color).subscribe((list: IList) => {
      this.clearListForm();
    })
  }
}
