import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationEvaluationService } from 'src/app/services/application-evaluation.service';
import { ApplicationEvaluation } from '../../models/application-evaluation';
import { ApplicationStatus } from '../../models/application-status';
import { NgForm } from '@angular/forms';
import { Application } from "../../models/application";
import { ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-application-evaluation',
  templateUrl: './application-evaluation.component.html',
  styleUrls: ['./application-evaluation.component.css']
})
export class ApplicationEvaluationComponent implements OnInit {
  status: string = '';
  user: User;
  
  @Input() application: Application;
  @Output() closeModal = new EventEmitter();

  constructor(private authService: AuthService, private appservice: ApplicationEvaluationService,public route:ActivatedRoute ) { 
    this.authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.status = event.target.value;
  }

  public onSubmit(applicationEvaluation) : void
  {
    let theApplication: ApplicationEvaluation = new ApplicationEvaluation();
    let appl: Application = new Application();
    theApplication.notes = applicationEvaluation.value['notes'];
    let theStatus: ApplicationStatus = new ApplicationStatus();
    if(this.status === 'Under_Review')
    {
      theStatus.id = 1;
      theStatus.stat = 'UNDER_REVIEW';
    }
    if(this.status === 'First_Stage')
    {
      theStatus.id = 2;
      theStatus.stat = 'FIRST_STAGE';
    }
    if(this.status === 'Behavioral')
    {
      theStatus.id = 3;
      theStatus.stat = 'BEHAVIORAL';
    }
    if(this.status === 'Technical')
    {
      theStatus.id = 4;
      theStatus.stat = 'TECHNICAL';
    }
    if(this.status === 'Hired')
    {
      theStatus.id = 5;
      theStatus.stat = 'HIRED';
    }
    if(this.status === 'Declined')
    {
      theStatus.id = 6;
      theStatus.stat = 'DECLINED';
    }

    theApplication.appStatus = theStatus;
    theApplication.adm = this.user;
    appl.id = this.application.id;
    theApplication.app= appl;
    theApplication.adm.roles = null; 
    var p=JSON.stringify(theApplication);

    this.appservice.addApplicationEvaluation(p).subscribe((data)=>{location.reload();});

  }
}
