import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/models/job';
import { User } from 'src/app/models/user';
import { ApplicationService } from 'src/app/services/application.service';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css'],
})
export class ApplicationFormComponent implements OnInit {
  constructor(
    private as: ApplicationService,
    public route: ActivatedRoute,
    private router: Router,
    private js: JobService
  ) {}

  ngOnInit(): void {}

  public onSubmit(appForm): void {
    let localUser: User = JSON.parse(localStorage.getItem('user'));
    let user: User = new User();
    user.id = localUser.id;
    user.email = localUser.email;
    let job: Job = new Job();
    job.id = JSON.parse(localStorage.getItem('job')).id;
    appForm.value['application']['users'] = [user];
    appForm.value['application']['job'] = job;
    var newP = JSON.stringify(appForm.value['application']);
    let data: FormData = new FormData();
    data.append('resume', appForm.value['resume']);
    data.append('coverLetter', appForm.value['coverLetter']);
    data.append('application', newP);
    this.as.postApplication(data).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('/applicant-portal');
    });
  }
}
