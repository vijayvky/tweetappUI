import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router, public loginService: LoginService) {}

  ngOnInit(): void {}
  onLogoutClick() {
    this.loginService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
