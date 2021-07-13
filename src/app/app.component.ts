import { Component } from '@angular/core';
import { IList } from './task-services.service';

export interface ILists extends IList {
  tasksAmout: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'My Todo App';
  constructor() { }
}
