import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
//import {HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Interview } from '../models/interview';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private apiUrl= environment.apiUrl;
  private baseURL: string = "/interview";
  public user: User[];

  constructor(private httpClient : HttpClient, private aservice : AuthService) {
  }

  //Required JWT Auth by any user to access the INTERVIEW service module
  httpOptions = { headers: new HttpHeaders(
    {
      'Content-Type' : 'application/json',
      Authorization : 'Bearer'+ JSON.stringify(this.aservice.userValue.token)
    }
  )};
 
  //accessed By( APPLICANTS ))
  //service to get their upcoming interviews using their id
  getUpcomingInterviews(id: number):Observable<Interview[]>{
    var newURL = `${this.apiUrl}${this.baseURL}/incoming?id=${id}`;
    let data = this.httpClient.get<Interview[]>(newURL, this.httpOptions)
    return data;
    
  }

  //accessed By( APPLICANTS ))
  //service to get their completed interviews using their id
  getCompletedAppInterviews(id: number):Observable<Interview[]>{
    var newURL = `${this.apiUrl}${this.baseURL}/appcompleted?id=${id}`;
    let data = this.httpClient.get<Interview[]>(newURL, this.httpOptions)
    return data;
    
  }

  //accessed By( APPLICANTS ))
  //service to get their upcoming interviews using their id
  getUpcomingAppInterviews(id: number):Observable<Interview[]>{
    var newURL = `${this.apiUrl}${this.baseURL}/appincoming?id=${id}`;
    let data = this.httpClient.get<Interview[]>(newURL, this.httpOptions)
    return data;
    
  }

  //accessed By( APPLICANTS ))
  //service to get their completed interviews using their id
  getCompletedInterviews(id: number):Observable<Interview[]>{
    var newURL = `${this.apiUrl}${this.baseURL}/completed?id=${id}`;
    let data = this.httpClient.get<Interview[]>(newURL, this.httpOptions)
    return data;
    
  }

  //accessed By( COGENT TEAMS ))
  //service to get all interviews of an applicant
  getAllInterviews(id: number):Observable<Interview[]>{
    var newURL = `${this.apiUrl}${this.baseURL}?id=${id}`;
    let data = this.httpClient.get<Interview[]>(newURL, this.httpOptions)
     data.forEach(i=>console.log(i));
     console.log(data);
    return data;
  }

  //accessed By( COGENT TEAMS ))
  //service to post an interview for an applicant
  postInterview(intsave: any):Observable<Interview[]> {
    var newURL = `${this.apiUrl}${this.baseURL}`;
    let data = this.httpClient.post<Interview[]>(newURL, intsave, this.httpOptions);
    return data;
  }

  //accessed By( COGENT TEAMS ))
  //service to update specific interview of an applicant
  updateInterview(intsave: any):Observable<Interview[]>{
    var newURL = `${this.apiUrl}${this.baseURL}`;
    let data = this.httpClient.put<Interview[]>(newURL, intsave, this.httpOptions);
    return data;
  }

  //accessed By( COGENT TEAMS ))
  //service to delete specific interview of an applicant
  deleteInterview(id: number){
    var newURL = `${this.apiUrl}${this.baseURL}?id=${id}`;
    let data = this.httpClient.delete(newURL,{responseType:'text'});
    console.log(data)
    return data;
  }
}

