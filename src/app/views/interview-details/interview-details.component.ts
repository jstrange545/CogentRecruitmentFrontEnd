import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Interview } from 'src/app/models/interview';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { InterviewService } from 'src/app/services/interview.service';

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.css'],
})
export class InterviewDetailsComponent implements OnInit {
  private iId: number;
  public incInterview: Interview[];
  public comInterview: Interview[];
  user: User;
  noIncInterviews: boolean = false;
  noComInterviews: boolean = false;
  private id: number;

  constructor(
    private iservice: InterviewService,
    private aservice: AuthService,
    private route: ActivatedRoute
  ) {
    this.aservice.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('testId');
    if (this.id != 12) {
      this.route.paramMap.subscribe(() => {
        this.iId = this.getUserId();
      });
      this.upcomingInterviews();
      this.completedInterviews();
    } else {
      this.route.paramMap.subscribe(() => {
        this.iId = +this.route.snapshot.paramMap.get('appId');
      });
      this.upcomingAppInterviews();
      this.completedAppInterviews();
    }
  }

  getUserId() {
    return this.user.id;
  }

  upcomingInterviews() {
    this.iservice.getUpcomingInterviews(this.iId).subscribe((res) => {
      this.incInterview = res;
      this.incInterview == null ||
      this.incInterview == undefined ||
      this.incInterview.length == 0
        ? (this.noIncInterviews = true)
        : (this.noIncInterviews = false);
    });
  }

  completedInterviews() {
    this.iservice.getCompletedInterviews(this.iId).subscribe((res) => {
      this.comInterview = res;
      this.comInterview == null ||
      this.comInterview == undefined ||
      this.comInterview.length == 0
        ? (this.noComInterviews = true)
        : (this.noComInterviews = false);
    });
  }

  upcomingAppInterviews() {
    this.iservice.getUpcomingAppInterviews(this.iId).subscribe((res) => {
      this.incInterview = res;
      this.incInterview == null ||
      this.incInterview == undefined ||
      this.incInterview.length == 0
        ? (this.noIncInterviews = true)
        : (this.noIncInterviews = false);
    });
  }

  completedAppInterviews() {
    this.iservice.getCompletedAppInterviews(this.iId).subscribe((res) => {
      this.comInterview = res;
      this.comInterview == null ||
      this.comInterview == undefined ||
      this.comInterview.length == 0
        ? (this.noComInterviews = true)
        : (this.noComInterviews = false);
    });
  }
}
