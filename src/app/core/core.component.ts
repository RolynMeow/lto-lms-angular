import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss'
})
export class CoreComponent implements OnInit {  
  user$!: Observable<User | null>; 

  constructor(
    private authService: AuthService
  ) { 
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.authService.me().subscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
