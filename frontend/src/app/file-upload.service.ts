import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpResponse, HttpHeaders,HttpParams,HttpEventType } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  private upurl='uploadURL';
  private dnurl='downloadURL';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http:HttpClient) { }

  uploadfile(file: File):Observable<any>{
    console.log(file)
    var formData = new FormData();
    formData.append('file',file);
    
    return this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'}).pipe(
      catchError(this.handleError)
    )
      
  }

  downloadfile(){
    return this.http.get<Blob>('https://cors-anywhere.herokuapp.com/http://theory.stanford.edu/~aiken/publications/papers/sigmod03.pdf',{responseType:'blob' as 'json'})
  }
  handleError(err:HttpErrorResponse){
    return throwError(err);
  }
}
