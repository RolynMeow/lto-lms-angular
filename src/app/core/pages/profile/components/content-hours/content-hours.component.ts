import { Component, OnInit } from '@angular/core';
import { TimeData } from '../../../../interfaces/rank';
import { Observable } from 'rxjs';
import { ProfileService } from '../../../../services/profile.service';

@Component({
  selector: 'content-hours',
  templateUrl: './content-hours.component.html',
  styleUrl: './content-hours.component.scss'
})
export class ContentHoursComponent implements OnInit {
  timeData$!: Observable<TimeData | null>;

  constructor(
    private profileService: ProfileService
  ) { 
    this.timeData$ = this.profileService.timeData$;
  }

  ngOnInit(): void { 
    this.profileService.timeData().subscribe();
  }
}
