import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITask {
  id: number,
  listId: number,
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getData ():Observable<any> {
    const url = `${this.baseUrl}/tasks`
    return this.http.get<ITask>(url);
  }
}
