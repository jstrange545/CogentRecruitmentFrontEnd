import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User;
  loginStatus$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    this.loginStatus$ = this.authService.isLoggedIn();
  }

  isLoggedIn() {
    this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  get isApplicant() {
    return this.user && this.user.roles.includes(Role.User);
  }

  get isRecruiter() {
    return this.user && this.user.roles.includes(Role.Recruiter);
  }

  get isManager() {
    return this.user && this.user.roles.includes(Role.Manager);
  }

  get isOwner() {
    return this.user && this.user.roles.includes(Role.Owner);
  }
}
