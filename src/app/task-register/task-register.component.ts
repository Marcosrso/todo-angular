import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IList, TaskService } from '../task-services.service';

@Component({
  selector: 'app-task-register',
  templateUrl: './task-register.component.html',
  styleUrls: ['./task-register.component.css']
})
export class TaskRegisterComponent implements OnInit{

  lists?: IList[];

  newTaskForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(4)]),
    listId: new FormControl('', Validators.required)
  })

  constructor(private TaskService:TaskService ) { }

  ngOnInit() {
    this.TaskService.getLists().subscribe(lists => {
      this.lists = lists;
    })
  }

  clearTaskForm(){
    this.newTaskForm.reset({
      title: '',
      listId: ''
    });
  }

  onSubmitTaskForm(){
    const list = this.newTaskForm.value;
    this.TaskService.insertTask(list.title,list.listId).subscribe(() => {
      this.clearTaskForm();
    })
  }

}
