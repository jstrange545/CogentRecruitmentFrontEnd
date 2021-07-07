import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {

  constructor(private js: JobService, private router: Router) { }

  ngOnInit(): void {
  }
  
  public onSubmit(jobForm) : void
  {
      var p=JSON.stringify(jobForm.value["job"]);
      this.js.addJob(p).subscribe();
      this.router.navigate(['/jobs'])  
  }

}
