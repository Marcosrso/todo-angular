import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIndexComponent } from './list-index.component';

describe('ListIndexComponent', () => {
  let component: ListIndexComponent;
  let fixture: ComponentFixture<ListIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
