import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service'
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { InterviewEvaluation } from '../models/interview-evaluation';


@Injectable({
  providedIn: 'root'
})
export class InterviewEvaluationService {

  constructor(private http: HttpClient, private aservice: AuthService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + JSON.stringify(this.aservice.userValue.token),
    }),
  };
  
  getEvaluationsByInterviewId(
    id: number
  ): Observable<InterviewEvaluation[]> {
    let data = this.http.get<InterviewEvaluation[]>(
      `${environment.apiUrl}/interviewEval/${id}`,
      this.httpOptions
    );
    console.log(data);
    return data;
  } 

  addInterviewEvaluation(p: any): Observable<string> {
    let data = this.http.post(`${environment.apiUrl}/interviewEval`, p, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'Bearer'+ JSON.stringify(this.aservice.userValue.token)

      }),
      responseType: 'text',
    });
    return data;
  }
}
