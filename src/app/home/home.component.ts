import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchUser: string;

  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}
  search() {
    this.loginService.getUserByUserName(this.searchUser).subscribe((data) => {
      this.router.navigate(['/search', this.searchUser]);
    });
  }
}
