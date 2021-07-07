import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecruiterPortalComponent } from './views/recruiter-portal/recruiter-portal.component';
import { ApplicantPortalComponent } from './views/applicant-portal/applicant-portal.component';
import { SigninComponent } from './views/signin/signin.component';
import { ApplicationEvaluationComponent } from './views/application-evaluation/application-evaluation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ManagerPortalComponent } from './views/manager-portal/manager/manager-portal.component';
import { OwnerPortalComponent } from './views/owner-portal/owner/owner-portal.component';
import { SignupComponent } from './views/signup/signup.component';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { JobComponent } from './views/job/job.component';
import { SingleJobComponent } from './views/single-job/single-job.component';
import { FooterComponent } from './views/footer/footer.component';
import { InterviewDetailsComponent } from './views/interview-details/interview-details.component';
import { InterviewComponent } from './views/interview/interview.component';
import { InterviewEvaluationComponent } from './views/interview-evaluation/interview-evaluation.component';
import { ApplicationFormComponent } from './views/application-form/application-form.component';
import { FileUploadComponent } from './views/application-form/file-upload/file-upload.component';
import { ApplicationTableComponent } from './views/application-table/application-table.component';
import { JobFormComponent } from './views/job-form/job-form.component';
import { ProgressBarComponent } from './views/progress-bar/progress-bar.component';
import { RecruiterDetailsComponent } from './views/recruiter-details/recruiter-details.component';
import { RecruiterTableComponent } from './views/recruiter-table/recruiter-table.component';
import { ApplicantTableComponent } from './views/applicant-table/applicant-table.component';
import { ApplicationUnassignedTableComponent } from './views/application-unassigned-table/application-unassigned-table.component';
import { UserFormComponent } from './views/user-form/user-form.component';
import { UserUpdateComponent } from './views/user-update/user-update.component';
import { ApplicationUpdateComponent } from './views/application-update/application-update.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './helpers/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    RecruiterPortalComponent,
    ApplicantPortalComponent,
    ApplicationEvaluationComponent,
    SigninComponent,
    ManagerPortalComponent,
    OwnerPortalComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    JobComponent,
    SingleJobComponent,
    FooterComponent,
    InterviewComponent,
    InterviewDetailsComponent,
    InterviewEvaluationComponent,
    ApplicationFormComponent,
    FileUploadComponent,
    ApplicationTableComponent,
    JobFormComponent,
    ProgressBarComponent,
    RecruiterDetailsComponent,
    RecruiterTableComponent,
    ApplicantTableComponent,
    ApplicationUnassignedTableComponent,
    UserFormComponent,
    UserUpdateComponent,
    ApplicationUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
