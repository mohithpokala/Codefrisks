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
  yourfile:File;
  username:string;
  label:string;
  form;
  constructor(private service:UserService) { }

  ngOnInit(): void {
    
    try{
      this.username=sessionStorage.getItem('username');
    }
    catch(err){
      location.replace("http://localhost:4200/login");
    }

    if(this.username==''){
      location.replace("http://localhost:4200/login");
    }
    this.form=new FormGroup({
      label : new FormControl('',[Validators.required]),
      file: new FormControl('',[Validators.required]),
      username: new FormControl(this.username,[])
    });
  }

  
  onChange(event) {
    if (event.target.files.length > 0) {
      this.yourfile=event.target.files[0];
    }
  }

  uploadfile() {
    const formData = new FormData();
    formData.append('username', this.form.get('username').value);
    formData.append('label', this.form.get('label').value);
    formData.append('data', this.yourfile,this.yourfile.name);

    this.service.add_files(formData).subscribe(
      response => {
        alert(response);
      },
      error => {  
        alert("fail");
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
