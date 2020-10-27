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
  isValid:boolean;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  registeruser(user:User):Observable<User>{
    var formData = new FormData();
    formData.append('username',user.username);
    formData.append('password',user.password);
    formData.append('email',user.email);
    return this.http.post<User>(this.registerurl,formData,this.httpOptions);
  }

  loginuser(user:{username:string,password:string}):Observable<any>{
    this.isValid=true;
    var formData = new FormData();
    formData.append('username',user.username);
    formData.append('password',user.password);
    return this.http.post<any>(this.authurl,formData,this.httpOptions);
  }

}
