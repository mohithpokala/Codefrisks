import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:string;
  temp:string;
  private options;
  username:string;

  private registerurl='http://127.0.0.1:8000/backend/users/';
  private authurl='http://127.0.0.1:8000/backend/auth/';
  private addfiles='http://127.0.0.1:8000/backend/add_files/';
  private viewfiles='http://127.0.0.1:8000/backend/view_files/';
  private 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  setusername(data):void{
    this.username=data;
  }
  getusername():string{
    return this.username;
  }
  registeruser(data):Observable<any>{
    console.log(data);
    return this.http.post<any>(this.registerurl,data);
  }
  settoken(data):void{
    this.token=data;
  }

  removetoken():void{
    this.token='';
  }
  loginuser(data):Observable<any>{
    return this.http.post<any>(this.authurl,data,this.httpOptions);
  }
  add_files(data):Observable<any>{
    this.temp='Token'+this.token;
    this.options= {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization':this.temp})
    };
    return this.http.post<any>(this.addfiles,data,this.options);
  }
  view_files(data):Observable<any>{
    this.temp='Token '+this.token;
    this.options= {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization':this.temp})
    };
    return this.http.post<any>(this.viewfiles,data,this.options);
  }
}
