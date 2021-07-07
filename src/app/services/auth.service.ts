import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  private loginStatus: BehaviorSubject<boolean>;
  public user: Observable<User>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'text',
    }),
  };

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/signin`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          localStorage.setItem('loginStatus', '1');
          this.loginStatus.next(true);
          return user;
        })
      );
  }

  addUser(p: any): Observable<string> {
    let data = this.http.post(`${environment.apiUrl}/signup`, p, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
    });
    return data;
  }

  checkLoginStatus(): boolean {
    if (localStorage.getItem('loginStatus') === '1') return true;
    else return false;
  }

  isLoggedIn() {
    return this.loginStatus.asObservable();
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    localStorage.setItem('loginStatus', '0');
    this.loginStatus.next(false);
    this.router.navigate(['/login']);
  }
}
