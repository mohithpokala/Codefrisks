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
  your_file:File;
  title:string;
  username:string;
  valid:boolean;
  constructor(private service:UserService) { }

  ngOnInit(): void {
    
    try{
      this.username=sessionStorage.getItem('username');
    }
    catch(err){
      location.replace("http://localhost:4200/login");
    }

    if(this.username==null){
      location.replace("http://localhost:4200/login");
    }
    this.valid=true;
  }

  onTitleChanged(event: any) {
    this.title = event.target.value;
  }

  onImageChanged(event: any) {
    this.your_file = event.target.files[0];
  }

  uploadfile() {
    const uploadData = new FormData();
    uploadData.append('username',this.username);
    uploadData.append('label', this.title);
    uploadData.append('data', this.your_file,this.your_file.name);
    this.service.add_files(uploadData).subscribe(
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
    this.service.view_files(uploadData).subscribe(response => {
      var i;
      for(i=0;i<response.length;i++){
        console.log(i);
        let blob:any = new Blob([response[i]['data']], { type: 'application/txt'});
        const url = window.URL.createObjectURL(blob);
        var x=response[i]['label']
        saveAs(blob, x);
      }
      console.log(response['data']);
			let blob:any = new Blob([response], { type: 'application/txt'});
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
      
      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(url);
    }, 100);
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }


}
