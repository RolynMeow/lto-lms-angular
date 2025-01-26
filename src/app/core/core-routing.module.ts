import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ModulesComponent } from './pages/modules/modules.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'quiz',
        component: QuizComponent
      },
      {
        path: 'module',
        loadChildren: () => import('./pages/modules/modules.module').then(m => m.ModulesModule),
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
