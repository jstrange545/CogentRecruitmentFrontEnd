import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/models/application';
import { Interview } from 'src/app/models/interview';
import { InterviewEvaluation } from 'src/app/models/interview-evaluation';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { InterviewEvaluationService } from 'src/app/services/interview-evaluation.service';
import { InterviewService } from 'src/app/services/interview.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css'],
})
export class InterviewComponent implements OnInit {
  private iId: number;
  private id: number;

  incInterview: Interview[];
  comInterview: Interview[];
  allInterview: Interview[];
  interviewEval: InterviewEvaluation[];
  currentInterview: Interview;
  isApplicant: boolean = false;
  isRecruiter: boolean = false;
  isManager: boolean = false;
  isOwner: boolean = false;
  edit = false;
  public hasnoUpcomingInterviews: boolean;
  public hasnoCompletedInterviews: boolean;



  user: User;
  applicant: User;
  currentApplicationId: number;
  applicantId:number;
  noIncInterviews : boolean = false;
  noComInterviews : boolean = false;


  constructor(
    private iservice: InterviewService,
    private uservice: UserService,
    private aservice: AuthService,
    private iEvalserv: InterviewEvaluationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.roles.includes(Role.Owner)) this.isOwner = true;
    else if (this.user.roles.includes(Role.Manager)) this.isManager = true;
    else if (this.user.roles.includes(Role.Recruiter)) this.isRecruiter = true;
    else if (this.user.roles.includes(Role.User)) this.isApplicant = true;
    
    this.route.paramMap.subscribe(()=>
    {
      this.currentApplicationId=+this.route.snapshot.paramMap.get('id');
      this.applicantId =+this.route.snapshot.paramMap.get('appId');
      this.id=+this.route.snapshot.paramMap.get("testId");
    });
    if (this.id != 12 ) {
      //console.log("We're not here !----------")
      this.upcomingInterviews();
      this.completedInterviews();
    } else {
      this.route.paramMap.subscribe(() => {
        this.iId =+this.route.snapshot.paramMap.get("appId");
        //console.log("We're here !----------")
      });
      this.upcomingAppInterviews();
      this.completedAppInterviews();
    }
  }

  //accessed By(COGENT TEAM)
  //opens the "Update Interview" form when clicked on "edit"
  // public onClick(updateInterview){
  //   this.edit = true;
  //   this.iId = updateInterview.id;
  //   console.log(updateInterview);
  // }

  //accessed By(COGENT TEAM) - allows to post an interview for an applicant
  public onSubmit(postInterview): void {
    let newInterview: Interview = new Interview();
    let app: Application = new Application();

    newInterview.name = postInterview.value['name'];
    newInterview.startTime = new Date(
      postInterview.value['date'] +
        'T' +
        postInterview.value['startTime'] +
        ':00'
    );
    newInterview.endTime = new Date(
      postInterview.value['date'] + 'T' + postInterview.value['endTime'] + ':00'
    );

    newInterview.startTime = new Date(
      newInterview.startTime.getTime() -
        newInterview.startTime.getTimezoneOffset() * 60000
    );
    newInterview.endTime = new Date(
      newInterview.endTime.getTime() -
        newInterview.endTime.getTimezoneOffset() * 60000
    );
    app.id = this.currentApplicationId;
    newInterview.application = app;
    var intsave = JSON.stringify(newInterview);
    this.iservice.postInterview(intsave).subscribe((data) => location.reload());
  }

  upcomingInterviews() {
    this.iservice.getUpcomingInterviews(this.applicantId).subscribe((res) => {
      this.incInterview = res;
      this.incInterview == null || this.incInterview == undefined || this.incInterview.length == 0 ? this.noIncInterviews = true : this.noIncInterviews = false;
    });
  }

  completedInterviews() {
    this.iservice.getCompletedInterviews(this.applicantId).subscribe((res) => {
      this.comInterview = res;
      this.comInterview == null || this.comInterview == undefined || this.comInterview.length == 0 ? this.noComInterviews = true : this.noComInterviews = false;
    });
  }

  upcomingAppInterviews(){
    this.iservice.getUpcomingAppInterviews(this.currentApplicationId).subscribe(
      res=>{
        this.incInterview=res;
        this.incInterview == null || this.incInterview == undefined || this.incInterview.length == 0 ? this.noIncInterviews = true : this.noIncInterviews = false;
      }
    )
  }

  completedAppInterviews(){
    this.iservice.getCompletedAppInterviews(this.currentApplicationId).subscribe(
      res=>{
        this.comInterview=res;
        this.comInterview == null || this.comInterview == undefined || this.comInterview.length == 0 ? this.noComInterviews = true : this.noComInterviews = false;
      }
    )
  }

  //accessed By(COGENT TEAM) - update the interview Name/Start time/End time
  editInterview(updateInterview) {
    updateInterview.id = this.iId;
    console.log(updateInterview.id);
    updateInterview.name = updateInterview.value['name'];
    updateInterview.startTime = updateInterview.value['startTime'];
    updateInterview.endTime = updateInterview.value['endTime'];
    console.log(updateInterview);
    var intsave = JSON.stringify(updateInterview);
    this.iservice
      .updateInterview(intsave)
      .subscribe((data) => console.log(data));
  }

  //accessed By(COGENT TEAM) - delete an interview

  delInterview(id: number): void {
    this.iservice.deleteInterview(id).subscribe((data) => {
      if (data === 'Deleted successfully') location.reload();
      else alert('Error');
    });
}

  @ViewChild('outsideElement', { static: true }) outsideElement: ElementRef;
  @ViewChild('modalView', { static: true }) modalView$: ElementRef;
  @ViewChild('post', { static: true }) post$: ElementRef;
  @ViewChild('eval', { static: true }) eval$: ElementRef;

  openModal(interviews: Interview, type: String) {
    this.currentInterview = interviews;

    if (type === 'eval') {
      this.eval$.nativeElement.classList.add('visible');
      this.iEvalserv
        .getEvaluationsByInterviewId(this.currentInterview.id)
        .subscribe((res) => {
          this.interviewEval = res;
        });
    } else {
      this.modalView$.nativeElement.classList.add('visible');
    }
  }

  openPostModal(type: String) {
    this.uservice
      .getById(this.applicantId)
      .subscribe((app) => (this.applicant = app));

    if (type === 'post') {
      this.post$.nativeElement.classList.add('visible');
    } else {
      this.modalView$.nativeElement.classList.add('visible');
    }
  }

  closeModal() {
    this.post$.nativeElement.classList.remove('visible');
    this.eval$.nativeElement.classList.remove('visible');
    //this.data="";
    //this.currentInterview = null;
  }
}
