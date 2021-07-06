import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITasks } from '../home/home.component';
import { IList } from '../task-services.service';

export interface IToggleTaskEvent {
  taskId: string,
  taskIsCompleted: boolean
}

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.css']
})
export class TaskIndexComponent {

  @Input() selectedList?: IList;
  @Input() tasks?: ITasks[];

  @Output() deleteTaskOnClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() toggleTaskOnClick: EventEmitter<IToggleTaskEvent> = new EventEmitter<IToggleTaskEvent>();

  constructor() { }

  handleDeleteTask(taskId: string) {
    this.deleteTaskOnClick.emit(taskId)
  }

  handleToggleTaskStatus(taskId: string, e: Event) {
    const target = e.target as HTMLInputElement;
    const taskEvent: IToggleTaskEvent = {
      taskId,
      taskIsCompleted: target.checked
    }
    this.toggleTaskOnClick.emit(taskEvent)
  }

}
