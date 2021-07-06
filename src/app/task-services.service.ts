import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

export type TaskStatus =  'Completed'| 'Waiting' | 'Deleted';

export interface ITask {
  id: string,
  listId: IList['id'],
  title: string,
  status: TaskStatus,
}

export interface IList {
  id: string,
  title: string,
  color?: string
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000';

  getTasks ():Observable<ITask[]> {
    const url = `${this.baseUrl}/tasks`
    return this.http.get<ITask[]>(url).pipe(map(tasks => tasks.filter(task =>  task.status === 'Completed' || task.status === 'Waiting')));
  }

  getTasksByList(listId: string):Observable<ITask[]> {
    const url = `${this.baseUrl}/tasks`
    return this.http.get<ITask[]>(url).pipe(
      map(tasks => tasks.filter(task => task.listId === listId))
    );
  }

  insertTask(title: string, listId: string):Observable<ITask> {
    const url = `${this.baseUrl}/tasks`;
    const task: ITask = {
      id: uuidv4(),
      title,
      listId,
      status: 'Waiting'
    }
    return this.http.post<ITask>(url,task);
  }

  updateTaskStatus(taskId:string, status: TaskStatus){
    const url = `${this.baseUrl}/tasks/${taskId}`;
    return this.http.patch<ITask>(url,{
      status
    });
  }

  getLists():Observable<IList[]> {
    const url = `${this.baseUrl}/lists`
    return this.http.get<IList[]>(url);
  }

  insertList(title: string, color?: string):Observable<IList> {
    const url = `${this.baseUrl}/lists`;
    const task: IList = {
      id: uuidv4(),
      title,
      color
    }
    return this.http.post<IList>(url,task);
  }
}
