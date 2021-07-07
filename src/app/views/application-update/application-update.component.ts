import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { User } from 'src/app/models/user';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-application-update',
  templateUrl: './application-update.component.html',
  styleUrls: ['./application-update.component.css'],
})
export class ApplicationUpdateComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private appService: ApplicationService
  ) {
    authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {}

  public onSubmit(appUpdate): void {
    let tmpApplication: Application;

    if (
      appUpdate.value['location'] == null ||
      appUpdate.value['location'] == undefined ||
      appUpdate.value['location'] == ''
    )
      tmpApplication.location = null;
    else tmpApplication.location = appUpdate.value['location'];

    if (
      appUpdate.value['uscitizen'] == null ||
      appUpdate.value['uscitizen'] == undefined ||
      appUpdate.value['uscitizen'] == ''
    )
      tmpApplication.uscitizen = null;
    else tmpApplication.uscitizen = appUpdate.value['uscitizen'];

    if (
      appUpdate.value['visaStatus'] == null ||
      appUpdate.value['visaStatus'] == undefined ||
      appUpdate.value['visaStatus'] == ''
    )
      tmpApplication.visaStatus = null;
    else tmpApplication.visaStatus = appUpdate.value['visaStatus'];

    if (
      appUpdate.value['degree'] == null ||
      appUpdate.value['degree'] == undefined ||
      appUpdate.value['degree'] == ''
    )
      tmpApplication.degree = null;
    else tmpApplication.degree = appUpdate.value['degree'];

    if (
      appUpdate.value['coreJavaRating'] == null ||
      appUpdate.value['coreJavaRating'] == undefined ||
      appUpdate.value['coreJavaRating'] == ''
    )
      tmpApplication.coreJavaRating = null;
    else tmpApplication.coreJavaRating = appUpdate.value['coreJavaRating'];

    if (
      appUpdate.value['advancedJavaRating'] == null ||
      appUpdate.value['advancedJavaRating'] == undefined ||
      appUpdate.value['advancedJavaRating'] == ''
    )
      tmpApplication.advancedJavaRating = null;
    else
      tmpApplication.advancedJavaRating = appUpdate.value['advancedJavaRating'];

    if (
      appUpdate.value['oopsRating'] == null ||
      appUpdate.value['oopsRating'] == undefined ||
      appUpdate.value['oopsRating'] == ''
    )
      tmpApplication.oopsRating = null;
    else tmpApplication.oopsRating = appUpdate.value['oopsRating'];

    if (
      appUpdate.value['exceptionHandlingRating'] == null ||
      appUpdate.value['exceptionHandlingRating'] == undefined ||
      appUpdate.value['exceptionHandlingRating'] == ''
    )
      tmpApplication.exceptionHandlingRating = null;
    else
      tmpApplication.exceptionHandlingRating =
        appUpdate.value['exceptionHandlingRating'];

    if (
      appUpdate.value['multithreadingRating'] == null ||
      appUpdate.value['multithreadingRating'] == undefined ||
      appUpdate.value['multithreadingRating'] == ''
    )
      tmpApplication.multithreadingRating = null;
    else
      tmpApplication.multithreadingRating =
        appUpdate.value['multithreadingRating'];

    if (
      appUpdate.value['collectionFrameworkRating'] == null ||
      appUpdate.value['collectionFrameworkRating'] == undefined ||
      appUpdate.value['collectionFrameworkRating'] == ''
    )
      tmpApplication.collectionFrameworkRating = null;
    else
      tmpApplication.collectionFrameworkRating =
        appUpdate.value['collectionFrameworkRating'];

    if (
      appUpdate.value['jdbcRating'] == null ||
      appUpdate.value['jdbcRating'] == undefined ||
      appUpdate.value['jdbcRating'] == ''
    )
      tmpApplication.jdbcRating = null;
    else tmpApplication.jdbcRating = appUpdate.value['jdbcRating'];

    let appUpdatData = JSON.stringify(tmpApplication);

    //we decided this is not a useful feature so I'm leaving it as is,
    //you would need to fetch a specific application id instead of using this.user.id
    this.appService
      .updateApplication(this.user.id, appUpdatData)
      .subscribe((data) => {
        console.log(data),
          (error) => {
            console.log(error);
            location.reload();
          };
      });
  }
}
