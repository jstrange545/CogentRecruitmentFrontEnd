import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';
import { NewUser } from '../../models/new-user';
import { NewRoles } from '../../models/new-roles';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  user: User;
  passwordsdontmatch: boolean;
  userwithemail: boolean;
  therole: string = '';

  constructor(private authService: AuthService, private router: Router) {
    authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {}

  selectChangeHandler(event: any) {
    //update the ui
    this.therole = event.target.value;
  }

  get isOwner() {
    return this.user && this.user.roles.includes(Role.Owner);
  }

  public onSubmit(applicantSignUp): void {
    this.passwordsdontmatch = true;
    if (
      applicantSignUp.value['password'] ===
      applicantSignUp.value['confirmPassword']
    ) {
      this.passwordsdontmatch = false;
      let theuser: NewUser = new NewUser();
      theuser.firstName = applicantSignUp.value['first_name'];
      theuser.lastName = applicantSignUp.value['last_name'];
      theuser.password = applicantSignUp.value['password'];
      theuser.email = applicantSignUp.value['email'];
      theuser.phone = applicantSignUp.value['phone'];
      theuser.linkedin = applicantSignUp.value['linkedin'];

      let arole: NewRoles = new NewRoles();
      arole.id = 1;

      let theroles: [NewRoles] = [arole];

      let arole2: NewRoles = new NewRoles();
      arole2.id = 2;
      let arole3: NewRoles = new NewRoles();
      arole3.id = 3;
      let arole4: NewRoles = new NewRoles();
      arole4.id = 4;

      if (this.therole === 'RECRUITER') {
        theroles.pop();
        theroles.push(arole2);
      }
      if (this.therole === 'MANAGER') {
        theroles.pop();
        theroles.push(arole2);
        theroles.push(arole3);
      }
      if (this.therole === 'OWNER') {
        theroles.pop();
        theroles.push(arole2);
        theroles.push(arole3);
        theroles.push(arole4);
      }

      theuser.roles = theroles;

      var p = JSON.stringify(theuser);
      this.authService.addUser(p).subscribe((data) => {
        if (data === 'User with this email already exists.') {
          this.userwithemail = true;
        } else {
          this.userwithemail = false;
          this.router.navigateByUrl('manager-portal');
        }
      });
    }
  }
}
