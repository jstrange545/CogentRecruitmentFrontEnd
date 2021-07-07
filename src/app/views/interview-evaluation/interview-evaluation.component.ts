import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { InterviewEvaluation } from 'src/app/models/interview-evaluation';
import { Interview } from 'src/app/models/interview';
import { InterviewEvaluationService } from 'src/app/services/interview-evaluation.service';

@Component({
  selector: 'app-interview-evaluation',
  templateUrl: './interview-evaluation.component.html',
  styleUrls: ['./interview-evaluation.component.css']
})
export class InterviewEvaluationComponent implements OnInit {
  user: User;
  @Input() interview: Interview;
  @Output() closeModal = new EventEmitter();

  constructor(private authService: AuthService, private intverviewEvalService: InterviewEvaluationService) { 
    this.authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
  }

  public onSubmit(interviewEvaluation) : void
  {
    let interviewE: InterviewEvaluation = new InterviewEvaluation();
    let newInterview: Interview = new Interview();
    newInterview.id = this.interview.id; 
    interviewE.admin = this.user;
    interviewE.admin.roles = null;
    interviewE.interview = newInterview;
    interviewE.notes = interviewEvaluation.value['notes'];
    interviewE.pass = interviewEvaluation.value['passed'];
    var p=JSON.stringify(interviewE);
    console.log(p);
    this.intverviewEvalService.addInterviewEvaluation(p)
    .subscribe(data=>{this.closeModal.emit(); location.reload();});
  }

}
