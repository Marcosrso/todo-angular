import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { TaskService } from './task-services.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskRegisterComponent } from './task-register/task-register.component';
import { ListRegisterComponent } from './list-register/list-register.component';
import { ListIndexComponent } from './list-index/list-index.component';
import { TaskIndexComponent } from './task-index/task-index.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskRegisterComponent,
    ListRegisterComponent,
    ListIndexComponent,
    TaskIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
