import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { Observable } from 'rxjs';
import { AdminService } from './services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewModalComponent } from './components/view-modal/view-modal.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  users$!: Observable<User[]>;
  user$!: Observable<User | null>;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private modalService: NgbModal
  ) { 
    this.users$ = this.adminService.users$;
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.adminService.index().subscribe();
  }

  view(user: User) {
    const modalRef = this.modalService.open(ViewModalComponent, { size: 'xl' });
    modalRef.componentInstance.user = user;
    modalRef.result.then(() => {}, () => {});
  }

  delete(user: User) {
    this.adminService.delete(user.id).subscribe();
  }
}
