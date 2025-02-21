import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../../auth/utils/auth.interceptor';

@NgModule({
  declarations: [
    QuizComponent,
    QuizzesComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
})
export class QuizModule { }
