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
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LeaderboardComponent } from './pages/profile/components/leaderboard/leaderboard.component';
import { EngagementsComponent } from './pages/profile/components/engagements/engagements.component';
import { ContentHoursComponent } from './pages/profile/components/content-hours/content-hours.component';
import { ProfileService } from './services/profile.service';
import { authInterceptor } from '../auth/utils/auth.interceptor';
import { UserDetailsComponent } from './pages/profile/components/user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbNavModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CoreComponent,
    NavBarComponent,
    HomeComponent,
    ProfileComponent,
    FeedbackComponent,
    LeaderboardComponent,
    EngagementsComponent,
    ContentHoursComponent,
    UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgbNavModule,
    NgbRatingModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
})
export class CoreModule { }
