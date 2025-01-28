import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ModuleService } from './services/module.service';
import { QuizService } from './services/quiz.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CoreComponent,
    NavBarComponent,
    HomeComponent,
    ProfileComponent,
    FeedbackComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ],
  providers: [
    ModuleService,
    QuizService
  ]
})
export class CoreModule { }
