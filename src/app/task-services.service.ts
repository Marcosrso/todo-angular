import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITask {
  id: number,
  listId: number,
  title: string
}

export interface ICategory {
  id: number,
  title: string
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

  insertTask(task: ITask):Observable<ITask> {
    const url = `${this.baseUrl}/tasks`
    return this.http.post<ITask>(url,task);
  }

  getCategories():Observable<ICategory[]> {
    const url = `${this.baseUrl}/lists`
    return this.http.get<ICategory[]>(url);
  }
}
