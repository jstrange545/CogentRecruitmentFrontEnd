import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { ApplicationEvaluation } from '../models/application-evaluation';

@Injectable({
  providedIn: 'root',
})
export class ApplicationEvaluationService {
  //Required JWT Auth by any user to access the INTERVIEW service module
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + JSON.stringify(this.aservice.userValue.token),
    }),
  };

  constructor(private http: HttpClient, private aservice: AuthService) {}

  addApplicationEvaluation(p: any): Observable<string> {
    let data = this.http.post(
      `${environment.apiUrl}/ApplicationEvaluation`,
      p,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text',
      }
    );
    return data;
  }

  getEvaluationsByApplicationId(
    id: number
  ): Observable<ApplicationEvaluation[]> {
    let data = this.http.get<ApplicationEvaluation[]>(
      `${environment.apiUrl}/ApplicationEvaluation/all?id=${id}`,
      this.httpOptions
    );
    return data;
  }
}
