import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ILists } from '../app.component';

@Component({
  selector: 'app-list-index',
  templateUrl: './list-index.component.html',
  styleUrls: ['./list-index.component.css']
})
export class ListIndexComponent {

  @Input() lists: ILists[] | undefined;
  @Output() listOnClick: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('categoriesWrapper') categoriesWrapper?: ElementRef;

  constructor() { }

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

  handleListOnClick(listId: string){
    this.listOnClick.emit(listId);
  }

}
