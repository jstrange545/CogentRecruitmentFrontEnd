import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewDetailsComponent } from './views/interview-details/interview-details.component';
import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/role';
import { ApplicantPortalComponent } from './views/applicant-portal/applicant-portal.component';
import { ApplicationEvaluationComponent } from './views/application-evaluation/application-evaluation.component';
import { HomeComponent } from './views/home/home.component';
import { ManagerPortalComponent } from './views/manager-portal/manager/manager-portal.component';
import { OwnerPortalComponent } from './views/owner-portal/owner/owner-portal.component';
import { RecruiterPortalComponent } from './views/recruiter-portal/recruiter-portal.component';
import { RecruiterTableComponent } from './views/recruiter-table/recruiter-table.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { JobComponent } from './views/job/job.component';
import { SingleJobComponent } from './views/single-job/single-job.component';
import { JobFormComponent } from './views/job-form/job-form.component';
import { ApplicationTableComponent } from './views/application-table/application-table.component';
import { InterviewComponent } from './views/interview/interview.component';
import { InterviewEvaluationComponent } from './views/interview-evaluation/interview-evaluation.component';
import { ApplicationFormComponent } from './views/application-form/application-form.component';
import { ApplicantTableComponent } from './views/applicant-table/applicant-table.component';
import { UserFormComponent } from './views/user-form/user-form.component';
import { UserUpdateComponent } from './views/user-update/user-update.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SigninComponent,
  },
  {
    path: 'register',
    component: SignupComponent,
  },
  {
    path: 'edit-profile',
    component: UserUpdateComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.Recruiter, Role.Manager, Role.Owner] },
  },
  {
    path: 'jobs',
    component: JobComponent,
  },
  {
    path: 'jobs/add',
    component: JobFormComponent,
  },
  {
    path: 'jobs/:id',
    component: SingleJobComponent,
  },
  {
    path: 'jobs/:id/interview/:id/:appId',
    component: InterviewComponent,
  },
  {
    path: 'jobs/:id/interview/:id/:appId/:testId',
    component: InterviewComponent,
  },
  {
    path: 'applicant-portal',
    component: ApplicantPortalComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User] },
  },
  {
    path: 'applicant-portal/application',
    component: ApplicationFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User] },
  },
  {
    path: 'applicant-portal/interview-details/:id',
    component: InterviewDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User] },
  },
  {
    path: 'applicant-portal/interview-details/:appId/:testId',
    component: InterviewDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User] },
  },
  {
    path: 'recruiter-portal',
    component: RecruiterPortalComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Recruiter] },
  },
  {
    path: 'recruiter-portal/interview/:id/:appId',
    component: InterviewComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Recruiter] },
  },
  {
    path: 'recruiter-portal/interview/:id/:appId/:testId',
    component: InterviewComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Recruiter] },
  },
  {
    path: 'manager-portal/applicant-table/interview/:id/:appId/:testId',
    component: InterviewComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  {
    path: 'recruiter-portal/interview-eval/:id',
    component: InterviewEvaluationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Recruiter] },
  },
  {
    path: 'recruiter-portal/evaluation/:id',
    component: ApplicationEvaluationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Recruiter] },
  },
  {
    path: 'recruiter-portal/interview-eval/:id',
    component: InterviewEvaluationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Recruiter] },
  },
  {
    path: 'manager-portal',
    component: ManagerPortalComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  {
    path: 'manager-portal/application-table',
    component: ApplicationTableComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  {
    path: 'manager-portal/applicant-table',
    component: ApplicantTableComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  {
    path: 'manager-portal/applicant-table/interview/:id/:appId',
    component: InterviewComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  {
    path: 'manager-portal/recruiter-table',
    component: RecruiterTableComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  {
    path: 'manager-portal/evaluation/:id',
    component: ApplicationEvaluationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  {
    path: 'manager-portal/interview/:id/:appId',
    component: InterviewComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  {
    path: 'manager-portal/applicant-table/interview/:id/:appId/:testId',
    component: InterviewComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  {
    path: 'manager-portal/interview-eval/:id',
    component: InterviewEvaluationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  {
    path: 'manager-portal/user-form',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  {
    path: 'owner-portal',
    component: OwnerPortalComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Owner] },
  },
  {
    path: 'manager-portal/user-form',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
