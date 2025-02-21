import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';
import { LessonsComponent } from './lessons/lessons.component';

const routes: Routes = [
  {
    path: '', 
    component: ModulesComponent
  },
  {
    path: ':id', 
    component: LessonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
