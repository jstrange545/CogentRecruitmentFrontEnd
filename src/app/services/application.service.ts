import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application';
import { Document } from '../models/document';
import { Job } from '../models/job';
import { Role } from '../models/role';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  job: Job;

  constructor(private httpClient: HttpClient, private aService: AuthService) {}

  //Required JWT Auth by any user to access the INTERVIEW service module
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + JSON.stringify(this.aService.userValue.token),
    }),
  };

  postApplication(p: FormData): Observable<string> {
    let data = this.httpClient.post(`${environment.apiUrl}/applications`, p, {
      responseType: 'text',
    });
    return data;
  }

  getApplications(user: User): Observable<Application[]> {
    if (user.roles.includes(Role.Manager) || user.roles.includes(Role.Owner)) {
      if (localStorage.getItem('job') != null) {
        this.job = JSON.parse(localStorage.getItem('job'));
        localStorage.removeItem('job');
        return this.httpClient.get<Application[]>(
          `${environment.apiUrl}/applications/job/${this.job.id}`
        );
      } else
        return this.httpClient.get<Application[]>(
          `${environment.apiUrl}/applications`
        );
    } else
      return this.httpClient.get<Application[]>(
        `${environment.apiUrl}/applications/user/${user.id}`
      );
  }

  getDocument(id: number, type: string): any {
    return this.httpClient
      .get(`${environment.apiUrl}/document?applicationId=${id}&type=${type}`, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((res: any) => {
          return new Blob([res.body], { type: 'application/pdf' });
        })
      );
  }

  updateApplication(id: number, app: any) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/applications/${id}`,
      app,
      this.httpOptions
    );
  }
}
