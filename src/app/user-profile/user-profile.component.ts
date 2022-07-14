import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login-service.service';
import { ProfileServiceService } from '../services/profile/profile-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  fileUpload: FormGroup;
  submitted = false;
  file: any;
  constructor(
    private fb: FormBuilder,
    public loginService: LoginService,
    private profileService: ProfileServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');

    if (id != null) {
      this.getUserById(id);
    }
    this.fileUpload = this.fb.group({
      file: [''],
    });
  }

  private getUserById(userId: string) {
    this.loginService.getUserByUserName(userId).subscribe((data) => {
      this.user = data;
    });
  }

  fileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
    this.addProfile();
  }

  addProfile() {
    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    if (loginId != null) {
      this.profileService.addProfile(loginId, this.file).subscribe((data) => {
        this.getUserById(loginId);
      });
    }
  }

  onLogoutClick() {
    this.loginService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
