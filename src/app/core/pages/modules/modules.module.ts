import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LessonsComponent } from './lessons/lessons.component';

@NgModule({
  declarations: [
    ModulesComponent,
    LessonsComponent,
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    NgApexchartsModule
  ]
})
export class ModulesModule { }
