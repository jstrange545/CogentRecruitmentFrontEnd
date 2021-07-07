import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  passwordsdontmatch: boolean;
  userwithemail: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public onSubmit(applicantSignUp): void {
    this.passwordsdontmatch = true;
    if (
      applicantSignUp.value['password'] ===
      applicantSignUp.value['confirmPassword']
    ) {
      this.passwordsdontmatch = false;
      let theuser: User = new User();
      theuser.firstName = applicantSignUp.value['first_name'];
      theuser.lastName = applicantSignUp.value['last_name'];
      theuser.password = applicantSignUp.value['password'];
      theuser.email = applicantSignUp.value['email'];
      theuser.phone = applicantSignUp.value['phone'];
      theuser.linkedin = applicantSignUp.value['linkedin'];

      var p = JSON.stringify(theuser);
      this.authService.addUser(p).subscribe((data) => {
        if (data === 'User with this email already exists.') {
          this.userwithemail = true;
        } else {
          this.userwithemail = false;
          this.authService
            .login(theuser.email, theuser.password)
            .subscribe((res) => {
              if (this.authService.isLoggedIn) {
                this.router.navigateByUrl('/jobs');
              }
            });
        }
      });
    }
  }
}
