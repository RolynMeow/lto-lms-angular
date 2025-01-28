import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuizComponent,
    QuizzesComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ]
})
export class QuizModule { }
