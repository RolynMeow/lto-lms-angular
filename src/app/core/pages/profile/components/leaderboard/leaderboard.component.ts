import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../services/profile.service';
import { Rank } from '../../../../interfaces/rank';
import { Observable } from 'rxjs';

@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit {
  rank$!: Observable<Rank | null>;

  constructor(
    private profileService: ProfileService
  ) { 
    this.rank$ = this.profileService.rank$;
  }

  ngOnInit(): void { 
    this.profileService.leaderboard().subscribe();
  }
}
