import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          if (this.authService.userValue.roles.includes(Role.Owner)) {
            this.router.navigateByUrl('/owner-portal');
            return;
          }
          if (this.authService.userValue.roles.includes(Role.Manager)) {
            this.router.navigateByUrl('/manager-portal');
            return;
          }
          if (this.authService.userValue.roles.includes(Role.Recruiter)) {
            this.router.navigateByUrl('/recruiter-portal');
            return;
          }
          if (this.authService.userValue.roles.includes(Role.User)) {
            this.router.navigateByUrl('/applicant-portal');
            return;
          }
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }
}
