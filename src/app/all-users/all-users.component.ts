import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login-service.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  allUsers: any = [];
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loginService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
    });
  }
}
