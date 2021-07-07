import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './recruiter-portal.component.html',
})
export class RecruiterPortalComponent implements OnInit {
  loading = false;
  applicants: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
