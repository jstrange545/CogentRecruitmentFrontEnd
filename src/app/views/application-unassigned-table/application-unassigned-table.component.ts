import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/models/application';
import { User } from 'src/app/models/user';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-application-unassigned-table',
  templateUrl: './application-unassigned-table.component.html',
  styleUrls: ['./application-unassigned-table.component.css'],
})
export class ApplicationUnassignedTableComponent implements OnInit {
  user: User;
  recruiters: User[];
  unassign: boolean = false;
  unassignedApplications: Application[];
  currentSelectedApplication: Application;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private appService: ApplicationService,
    private router: Router
  ) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    this.listUnassignedApplications();
    this.listRecruiters();
  }

  @ViewChild('assignRec', { static: true }) assignRec$: ElementRef;

  listRecruiters() {
    this.userService.getAllRecruiters().subscribe((data) => {
      this.recruiters = data;
    });
  }

  listUnassignedApplications() {
    this.appService.getApplications(this.user).subscribe((data) => {
      this.unassignedApplications = data.filter((app) => {
        return app.users.length == 1; 
      });
      this.unassignedApplications.length == 0 ? this.unassign = true: this.unassign =false;
      console.log(this.unassignedApplications);
    });
  }

  assignApplicant(appId: number, recruiterId: number) {
    this.userService
      .assignRecruiterToApplication(appId, recruiterId)
      .subscribe((data) => this.reload());
  }

  openModal(application: Application, type: string) {
    this.currentSelectedApplication = application;
    this.assignRec$.nativeElement.classList.add('visible');
  }

  closeModal() {
    this.assignRec$.nativeElement.classList.remove('visible');
    this.currentSelectedApplication = null;
  }

  reload() {
    this.router.navigate(['/manager-portal/applicant-table']);
  }
}
