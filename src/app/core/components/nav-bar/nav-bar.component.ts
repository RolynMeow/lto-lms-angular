import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../interfaces/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  user$!: Observable<User | null>

  constructor(
    private authService: AuthService
  ) { 
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    
  }
}
