import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/models/application';
import { NewRoles } from 'src/app/models/new-roles';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recruiter-table',
  templateUrl: './recruiter-table.component.html',
  styleUrls: ['./recruiter-table.component.css'],
})
export class RecruiterTableComponent implements OnInit {
  user: User;
  recruiters: User[];
  applications: Application[];
  recruiterApplications: Application[];
  recruiterNonApplications: Application[];
  currentSelectedRecruiter: User;
  unassign: Boolean=false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private appService: ApplicationService,
    private router: Router
  ) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    this.listRecruiters();
    this.listApplications();
  }

  @ViewChild('recApplicants', { static: true }) recApplicants$: ElementRef;
  @ViewChild('recAssign', { static: true }) recAssign$: ElementRef;

  listRecruiters() {
    this.userService.getAllRecruiters().subscribe((data) => {
      this.recruiters = data;
    });
  }

  listApplications() {
    this.appService.getApplications(this.user).subscribe((data) => {
      this.applications = data;
    });
  }

  setRecruiterApplications() {
    this.appService
      .getApplications(this.currentSelectedRecruiter)
      .subscribe((data) => {
        this.recruiterApplications = data.map((app=>{
          app.users = app.users.filter(user=>{  
            let isUsr : boolean = true;  
              for(let i = 0; i　< user.roles.length; i++){
                let newRole : NewRoles;
                newRole = <NewRoles><unknown>user.roles[i];
                if(newRole.name !== Role.User) {
                  isUsr = false;
                }
              }
              return isUsr;
            })
            return app;
      }))
    this.applications.length == 0 ? this.unassign = true: this.unassign =false;
      });
  }

  setRecruiterNonApplications() {
    this.recruiterNonApplications = this.applications.filter((app) => {
      return !app.users.some(
        (user) => user.id === this.currentSelectedRecruiter.id
      );
    });
    this.recruiterNonApplications = this.recruiterNonApplications.map((app=>{
      app.users = app.users.filter(user=>{  
        let isUsr : boolean = true;  
          for(let i = 0; i　< user.roles.length; i++){
            let newRole : NewRoles;
            newRole = <NewRoles><unknown>user.roles[i];
            if(newRole.name !== Role.User) {
              isUsr = false;
            }
          }
          return isUsr;
        })
        return app;
  }))
  }

  unassignApplicant(appId: number, recruiterId: number) {
    this.userService
      .unassignRecruiterToApplication(appId, recruiterId)
      .subscribe(error => {
        console.log(error);
        location.reload();
      });
  }

  assignApplicant(appId: number, recruiterId: number) {
    this.userService
      .assignRecruiterToApplication(appId, recruiterId)
      .subscribe(data=>console.log(data), error => {
        console.log(error);
        location.reload();
      });
  }

  openModal(recruiter: User, type: string) {
    this.currentSelectedRecruiter = recruiter;
    if (type === 'recAssign') {
      this.setRecruiterNonApplications();
      this.recAssign$.nativeElement.classList.add('visible');
    } else {
      this.setRecruiterApplications();
      this.recApplicants$.nativeElement.classList.add('visible');
    }
  }

  closeModal() {
    this.recApplicants$.nativeElement.classList.remove('visible');
    this.recAssign$.nativeElement.classList.remove('visible');
    this.currentSelectedRecruiter = null;
  }

  reload() {
    this.router.navigate(['/manager-portal/recruiter-table']);
  }
}
