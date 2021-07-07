import { Component, OnInit } from '@angular/core';
import { ApplicationStatus } from 'src/app/models/application-status';
import { User } from 'src/app/models/user';
import { ApplicationEvaluationService } from 'src/app/services/application-evaluation.service';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  public user: User;
  public mostRecentApplicationId: number = null;
  public applicationStatus: ApplicationStatus = null;

  public progressBarTitle = 'No Application Completed';
  public applicationStatusMsg =
    'Your application is currently under review, check your inbox regularly for updates!';
  public progressBarStatus = 10;

  constructor(
    private appEvalService: ApplicationEvaluationService,
    private appService: ApplicationService,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    this.getApplicationStatus();
  }

  getApplicationStatus() {
    return this.appService.getApplications(this.user).subscribe((data) => {
      this.progressBarTitle =
        'Application: ' +
        data[0].job.name +
        ' Batch ' +
        data[0].job.batch;

      this.mostRecentApplicationId = data[0].id;

      this.appEvalService
        .getEvaluationsByApplicationId(this.mostRecentApplicationId)
        .subscribe((evals) => {
          this.applicationStatus = evals[0].appStatus;
          this.setProgress();
        });
    });
  }

  setProgress() {
    if (
      this.applicationStatus === null ||
      this.applicationStatus === undefined
    ) {
      this.applicationStatusMsg =
        'Your application is currently under review, check your inbox regularly for updates!';
      this.progressBarStatus = 10;
    }
    if (this.applicationStatus.id == 1) {
      this.applicationStatusMsg =
        'Your application is currently under review, check your inbox regularly for updates!';
      this.progressBarStatus = 10;
    }
    if (this.applicationStatus.id == 2) {
      this.applicationStatusMsg =
        'Your application is in the first stage, prepare for the interviews to come!';
      this.progressBarStatus = 30;
    }
    if (this.applicationStatus.id == 3) {
      this.applicationStatusMsg =
        'Your application is in the behavioral stage, we look forward to talking more soon!';
      this.progressBarStatus = 50;
    }
    if (this.applicationStatus.id == 4) {
      this.applicationStatusMsg =
        'Your application is in the technical stage, make sure to brush up on core programming concepts!';
      this.progressBarStatus = 70;
    }
    if (this.applicationStatus.id == 5) {
      this.applicationStatusMsg =
        'You have been selected for the program, congratulations!! Your recruiter will contact you with more details.';
      this.progressBarStatus = 100;
    }
    if (this.applicationStatus.id == 6) {
      this.applicationStatusMsg =
        'Your application has been declined for this position. We encourage you to apply to future openings.';
      this.progressBarStatus = 100;
    }
  }
}
