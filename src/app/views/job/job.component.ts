import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  jobs: Job[];
  job: Job[];
  user: User;
  role = Role.User;
  manRole = Role.Manager;

  constructor(
    private js: JobService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listJobs();
    });
  }

  listJobs() {
    this.user = this.authService.userValue;
    if (this.user != null) {
      if (this.user.roles.includes(this.role)) {
        this.js.getVacantJobs().subscribe((theJobs) => {
          this.jobs = theJobs;
        });
      } else {
        this.js.getAllJobs().subscribe((theJobs) => {
          this.jobs = theJobs;
        });
      }
    } else {
      this.js.getVacantJobs().subscribe((theJobs) => {
        this.jobs = theJobs;
      });
    }
  }
}
