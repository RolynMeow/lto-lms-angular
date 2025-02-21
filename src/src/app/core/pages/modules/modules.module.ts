import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LessonsComponent } from './lessons/lessons.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../../auth/utils/auth.interceptor';

@NgModule({
  declarations: [
    ModulesComponent,
    LessonsComponent,
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    NgApexchartsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
})
export class ModulesModule { }
