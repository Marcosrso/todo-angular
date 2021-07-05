import { Component, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IList, ITask, TaskService } from '../task-services.service';

interface ILists extends IList {
  tasksAmout: number;
}

@Component({
  selector: 'app-task-register',
  templateUrl: './task-register.component.html',
  styleUrls: ['./task-register.component.css']
})
export class TaskRegisterComponent {

  @Input() lists: ILists[] = [{
    id: '',
    title: 'Todas as tarefas',
    color: '#3276b1',
    tasksAmout: 0,
  }];

  @Input() tasks: ITask[] | undefined;

  newTaskForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(4)]),
    listId: new FormControl('')
  })

  constructor(private TaskService:TaskService ) { }

  clearTaskForm(){
    this.newTaskForm.reset({
      title: '',
      listId: ''
    });
  }

  onSubmitTaskForm(){
    const list = this.newTaskForm.value;
    this.TaskService.insertTask(list.title,list.listId).subscribe((task: ITask) => {
      this?.tasks?.push(task);
      this.clearTaskForm();
    })
  }

}
