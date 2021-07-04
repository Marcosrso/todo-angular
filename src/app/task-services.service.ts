import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface ITask {
  id: string,
  listId: IList['id'],
  title: string
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
    return this.http.get<ITask[]>(url);
  }

  insertTask(title: string, listId: string):Observable<ITask> {
    const url = `${this.baseUrl}/tasks`;
    const task: ITask = {
      id: uuidv4(),
      title,
      listId
    }
    return this.http.post<ITask>(url,task);
  }

  getList():Observable<IList[]> {
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
