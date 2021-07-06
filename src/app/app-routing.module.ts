import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListRegisterComponent } from './list-register/list-register.component';
import { TaskRegisterComponent } from './task-register/task-register.component';

const routes: Routes = [
  {path: "", pathMatch: 'full', component: HomeComponent},
  {path: "tarefas/nova", component: TaskRegisterComponent},
  {path: "tarefas/categorias/nova", component: ListRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
