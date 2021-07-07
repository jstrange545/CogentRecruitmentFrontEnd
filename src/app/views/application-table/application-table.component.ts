import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { Application } from 'src/app/models/application';
import { ApplicationEvaluation } from 'src/app/models/application-evaluation';
import { NewRoles } from 'src/app/models/new-roles';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { ApplicationEvaluationService } from 'src/app/services/application-evaluation.service';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.css'],
})
export class ApplicationTableComponent implements OnInit {
  applications: Application[];
  currentApplication: Application;
  data: string = '';
  user: User;
  isApplicant: boolean = false;
  isRecruiter: boolean = false;
  applicationEvas: ApplicationEvaluation[];
  unassign: boolean = false;

  constructor(
    private as: ApplicationService,
    private sanitizer: DomSanitizer,
    private aes: ApplicationEvaluationService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.roles.includes(Role.User)) this.isApplicant = true;
    else if (this.user.roles.includes(Role.Recruiter)) this.isRecruiter = true;
    this.listApplications();
  }

  listApplications() {
    this.as.getApplications(this.user).subscribe((data) => {
       this.applications = data.map((app=>{
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

  @ViewChild('outsideElement', { static: true }) outsideElement: ElementRef;
  @ViewChild('modalView', { static: true }) modalView$: ElementRef;
  @ViewChild('docView', { static: true }) docView$: ElementRef;
  @ViewChild('eva', { static: true }) eva$: ElementRef;

  openDocModal(type: string) {
    this.as.getDocument(this.currentApplication.id, type).subscribe((res) => {
      this.data = URL.createObjectURL(res);
    });
    this.docView$.nativeElement.classList.add('visible');
  }

  openModal(tempApplication: Application, type: string) {
    this.currentApplication = tempApplication;
    if (type === 'eva') {
      this.eva$.nativeElement.classList.add('visible');
      this.aes
        .getEvaluationsByApplicationId(this.currentApplication.id)
        .subscribe((res) => {
          this.applicationEvas = res;
        });
    } else {
      this.modalView$.nativeElement.classList.add('visible');
    }
  }

  closeModal() {
    this.modalView$.nativeElement.classList.remove('visible');
    this.eva$.nativeElement.classList.remove('visible');
    this.data = '';
    this.currentApplication = null;
  }

  docAvailability(type: string) {
    let temp = this.currentApplication.documents;
    if (temp.length == 0) return true;
    else if (temp.length < 2) return !(temp[0].name === type);
    return false;
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const outsideElement =
      this.outsideElement.nativeElement.contains(targetElement);
    if (outsideElement) {
      URL.revokeObjectURL(this.data);
      this.data = '';
      this.docView$.nativeElement.classList.remove('visible');
    }
  }

  dataURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.data);
  }
}
