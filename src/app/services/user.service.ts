import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private aservice: AuthService) {}

  //Required JWT Auth by any user to access the INTERVIEW service module
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + JSON.stringify(this.aservice.userValue.token),
    }),
  };

  getAllApplicants(): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.apiUrl}/users/applicants`,
      this.httpOptions
    );
  }
  getAllAdmins() {
    return this.http.get<User[]>(
      `${environment.apiUrl}/users/admins`,
      this.httpOptions
    );
  }

  getAllRecruiters(): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.apiUrl}/users/recruiters`,
      this.httpOptions
    );
  }

  getById(id: number) {
    return this.http.get<User>(
      `${environment.apiUrl}/users/${id}`,
      this.httpOptions
    );
  }

  assignRecruiterToApplication(appId: number, recruiterId: number): any {
    return this.http.post(
      `${environment.apiUrl}/users/assignRecruiter/${appId}/${recruiterId}`,
      this.httpOptions
    );
  }

  unassignRecruiterToApplication(appId: number, recruiterId: number): any {
    return this.http.post(
      `${environment.apiUrl}/users/unassignRecruiter/${appId}/${recruiterId}`,
      this.httpOptions
    );
  }

  updateUser(id: number, user: any) {
    return this.http.put<any>(
      `${environment.apiUrl}/users/${id}`,
      user,
      this.httpOptions
    );
  }
}
