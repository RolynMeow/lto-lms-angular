import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../auth/services/auth.service';
import { User, Badge } from '../../../../../interfaces/user';
import { ProfileService } from '../../../../services/profile.service';
import { AdminService } from '../../services/admin.service';
import { ActivityHistory } from '../../../../interfaces/activity-history';
import { BookmarkHistory } from '../../../../interfaces/bookmark';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrl: './view-modal.component.scss'
})
export class ViewModalComponent implements OnInit {
  @Input() user!: User;

  userForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null),
    first_name: new FormControl(null, Validators.required),
    last_name: new FormControl(null, Validators.required),
    profile_picture: new FormControl(null, Validators.min(6)),
    address: new FormControl(null),
  });

  badges$!: Observable<Badge[]>;
  bookmarks$!: Observable<BookmarkHistory[]>;
  activityHistory$!: Observable<ActivityHistory[]>;

  active = 1;

  constructor(
    public modal: NgbActiveModal,
    private adminService: AdminService,
    private modalService: NgbModal
  ) { 
    this.badges$ = this.adminService.badges$;
    this.bookmarks$ = this.adminService.bookmarks$;
    this.activityHistory$ = this.adminService.activityHistory$;
  }

  get profile_picture() {
    return this.userForm.get('profile_picture')?.value;
  }

  get first_name() {
    return this.userForm.get('first_name')?.value;
  }

  get last_name() {
    return this.userForm.get('last_name')?.value;
  }

  get address() {
    return this.userForm.get('address')?.value;
  }

  ngOnInit(): void {
    this.patch();
    this.adminService.badges(this.user.id).subscribe();
    this.adminService.bookmarks(this.user.id).subscribe();
    this.adminService.activityHistory(this.user.id).subscribe();
    this.userForm.controls['username'].disable();
    this.userForm.controls['email'].disable();  
  }

  update() {
    const formValue = this.userForm.value;
    const cleanedValue = Object.fromEntries(
      Object.entries(formValue).filter(([key, value]) => value !== null && value !== '')
    );
    this.adminService.update(this.user.id, cleanedValue).subscribe();
    this.patch();
  }

  view(template: TemplateRef<any>, size: string = 'xl') {
    const modal = this.modalService.open(template, { size: size, backdrop: 'static' });
    modal.result.then(
      (result) => {
      
      },
      () => {}
    )
  }

  patch() {
    if (this.user) {
      this.userForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        address: this.user.address,
        profile_picture: this.user.profile_picture
      });
    }
  }
}
