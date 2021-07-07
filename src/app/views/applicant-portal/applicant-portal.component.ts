import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/application';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './applicant-portal.component.html',
})
export class ApplicantPortalComponent implements OnInit {
  loading = false;
  noApp$ = true;
  user: User;
  userApplications: Application[];

  constructor(
    private appService: ApplicationService,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit() {
    this.noApplicationFound();
  }

  noApplicationFound() {
    this.appService.getApplications(this.user).subscribe((data) => {
      this.userApplications = data;
      if (
        this.userApplications == null ||
        this.userApplications == undefined ||
        this.userApplications.length === 0
      ) {
        this.noApp$ = true;
      } else this.noApp$ = false;
    });
  }
}
