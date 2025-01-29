import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Engagement } from '../../../../interfaces/rank';
import { ProfileService } from '../../../../services/profile.service';

@Component({
  selector: 'engagements',
  templateUrl: './engagements.component.html',
  styleUrl: './engagements.component.scss'
})
export class EngagementsComponent implements OnInit {
  engagement$!: Observable<Engagement | null>;

  constructor(
    private profileService: ProfileService
  ) { 
    this.engagement$ = this.profileService.engagement$;
  }

  ngOnInit(): void { 
    this.profileService.engagement().subscribe();
  }
}
