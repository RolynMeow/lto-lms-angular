import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { Observable } from 'rxjs';
import { ChartOptions } from '../../../interfaces/chart-options';
import { Mdule } from '../../interfaces/module';
import { Progress } from '../../interfaces/progress';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Bookmark, BookmarkHistory } from '../../interfaces/bookmark';
import { ActivityHistory } from '../../interfaces/activity-history';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
logout() {
throw new Error('Method not implemented.');
}
  modules$!: Observable<Mdule[]>;
  bookmarks$!: Observable<BookmarkHistory[]>;
  activityHistory$!: Observable<ActivityHistory[]>;

  chartOptions: ChartOptions[] = [];
  active: number = 1;
user: any;

  constructor(
    private moduleService: ModuleService,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.modules$ = this.moduleService.modules$;
    this.bookmarks$ = this.profileService.bookmarks$; 
    this.activityHistory$ = this.profileService.activityHistory$;
    this.modules$.subscribe(modules => {
      this.chartOptions.push(...modules.map(module => this.chartConfig(module.progress)));
    });
  }

  ngOnInit(): void {
    this.moduleService.index().subscribe();
    this.profileService.activityHistory().subscribe();
    this.profileService.bookmarks().subscribe();
  }

  chartConfig(progress: Progress): ChartOptions {
    return {
      series: [progress.total_lessons - progress.completed_lessons, progress.completed_lessons],
      colors: ['#6c757d', '#28a745'],
      labels: ["Total", "Completed"],
      chart: {
        height: 150,
        width: 150,
        type: "donut"
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
            }
          }
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: true
      }
    }
  }

  bookmarkAction(id: number) {
    this.moduleService.bookmark(id).subscribe(() => this.profileService.bookmarks().subscribe());
  }

}
