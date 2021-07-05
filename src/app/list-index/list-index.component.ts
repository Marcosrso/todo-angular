import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ILists } from '../app.component';
import { IList } from '../task-services.service';

@Component({
  selector: 'app-list-index',
  templateUrl: './list-index.component.html',
  styleUrls: ['./list-index.component.css']
})
export class ListIndexComponent implements OnInit {

  @Input() lists: ILists[] | undefined;
  @Output() listOnClick: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('categoriesWrapper') categoriesWrapper?: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

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
