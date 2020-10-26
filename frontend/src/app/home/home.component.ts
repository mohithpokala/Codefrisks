import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpEventType, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';  
import { of } from 'rxjs';
import { UserService } from '../user.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  files:File[];
  percentDone: number;
  uploadSuccess: boolean;
  file:File;
  username:string;
  label:string;
  form;
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.username=this.service.getusername();
    this.form=new FormGroup({
      label : new FormControl('',[Validators.required]),
      file: new FormControl('',[Validators.required])
    });
  }

  onchoose(input:File[]){
    this.files=input;
  }

  uploadfile(){
    const uploadData = JSON.stringify(this.form.value);
    uploadData['username']=this.username;
    this.service.add_files(uploadData).subscribe(
      response=>{
        alert(response);
      },
      error=>{
        alert('failed')
      }
    );
  }

  downloadfile(){
    const uploadData = new FormData();
    uploadData.append('username', this.username);
    this.service.view_files(JSON.stringify(uploadData)).subscribe(response => {
			let blob:any = new Blob([response], { type: 'application/pdf'});
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
      saveAs(blob, 'test.pdf');
      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(url);
    }, 100);
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }


}
