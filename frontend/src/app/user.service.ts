import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerurl='http://127.0.0.1:8000/backend/users/';
  private authurl='http://127.0.0.1:8000/backend/auth/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  registeruser(user:User):Observable<User>{
    return this.http.post<User>(this.registerurl,user,this.httpOptions);
  }

  loginuser(user):Observable<any>{
    return this.http.post<any>(this.authurl,user,this.httpOptions);
  }

}
