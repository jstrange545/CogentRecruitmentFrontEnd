import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from '../models/job';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })

export class JobService {

    constructor(public http: HttpClient, private as: AuthService) {}

    httpOptions = {headers: new HttpHeaders(
        {
            'Content-Type' : 'application/json',
        }
    )}

    getAllJobs() {
        this.httpOptions.headers.set('Authorization' ,'Bearer' + " "+this.as.userValue.token);
        return this.http.get<Job[]>(`${environment.apiUrl}/jobs`,this.httpOptions);
    }
    
    getVacantJobs() {
        return this.http.get<Job[]>(`${environment.apiUrl}/jobs/vacant`);
    }
    
    getJob(id:number) {
        return this.http.get<Job>(`${environment.apiUrl}/jobs/${id}`);
    }

    addJob(p:any): Observable<string> {
        return this.http.post<GetResponse2>(`${environment.apiUrl}/jobs`,p,this.httpOptions).pipe(map(response => response.result));
    }
}

interface GetResponse2 {
    result: string
}