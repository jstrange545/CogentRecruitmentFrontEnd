import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recruiter-details',
  templateUrl: './recruiter-details.component.html',
  styleUrls: ['./recruiter-details.component.css'],
})
export class RecruiterDetailsComponent implements OnInit {
  public user: User;
  public recruiters: User[];
  public mostRecentApplication: Application;
  public noRecruiters: boolean = false;

  constructor(
    private appService: ApplicationService,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    this.getApplicantRecruiters();
  }

  getApplicantRecruiters() {
    return this.appService.getApplications(this.user).subscribe((data) => {
      this.mostRecentApplication = data[data.length - 1];
      this.recruiters = this.mostRecentApplication.users.filter(
        (usr) => usr.email !== this.user.email
      );
      this.recruiters == null || this.recruiters == undefined || this.recruiters.length == 0 ? this.noRecruiters = true : this.noRecruiters = false;
    });
  }
}
