import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Application } from 'src/app/models/application';

@Component({
  selector: 'app-single-job',
  templateUrl: './single-job.component.html',
  styleUrls: ['./single-job.component.css']
})
export class SingleJobComponent implements OnInit {
  notfetchingdata: boolean;
  job: Job[]
  user: User
  role = Role.User
  role2 = Role.Manager
  private id:number

  constructor(private js:JobService, 
    private route:ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>
    {
      this.id=+this.route.snapshot.paramMap.get("id");

      this.listJob();
    });
   
  }

  listJob(){
    // this.user = this.authService.userValue;
    // if (this.user != null) {
      this.user = this.authService.userValue;
      this.js.getJob(this.id).subscribe(job=>
        {
        this.job=[job]
        localStorage.setItem('job',JSON.stringify(this.job[0]))
      })
    // }
    
  }

}
