import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  user: User;
  passwordsDontMatch: boolean;
  userFromLocal: User;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {}

  public onSubmit(profileUpdate): void {
    this.passwordsDontMatch = true;
    if (
      profileUpdate.value['password'] === profileUpdate.value['confirmPassword']
    ) {
      this.passwordsDontMatch = false;
      let theUser: User = new User();

      if (
        profileUpdate.value['first_name'] == null ||
        profileUpdate.value['first_name'] == undefined ||
        profileUpdate.value['first_name'] == ''
      )
        theUser.firstName = null;
      else theUser.firstName = profileUpdate.value['first_name'];

      if (
        profileUpdate.value['last_name'] == null ||
        profileUpdate.value['last_name'] == undefined ||
        profileUpdate.value['last_name'] == ''
      )
        theUser.lastName = null;
      else theUser.lastName = profileUpdate.value['last_name'];

      if (
        profileUpdate.value['password'] == null ||
        profileUpdate.value['password'] == undefined ||
        profileUpdate.value['password'] == ''
      )
        theUser.password = null;
      else theUser.password = profileUpdate.value['password'];

      if (
        profileUpdate.value['phone'] == null ||
        profileUpdate.value['phone'] == undefined ||
        profileUpdate.value['phone'] == ''
      )
        theUser.phone = null;
      else theUser.phone = profileUpdate.value['phone'];

      if (
        profileUpdate.value['linkedin'] == null ||
        profileUpdate.value['linkedin'] == undefined ||
        profileUpdate.value['linkedin'] == ''
      )
        theUser.linkedin = null;
      else theUser.linkedin = profileUpdate.value['linkedin'];

      theUser.active = true;

      let userUpdate = JSON.stringify(theUser);
      this.userService
        .updateUser(this.user.id, userUpdate)
        .subscribe((data) => {
            (error) => {
              console.log(error);
              location.reload();
            };
        });
    }
  }
}
