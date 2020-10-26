import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpEventType, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';  
import { of } from 'rxjs';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  files:File[];
  percentDone: number;
  uploadSuccess: boolean;

  constructor(private service:FileUploadService) { }

  ngOnInit(): void {
  }

  onchoose(input:File[]){
    this.files=input;
  }

  uploadfile(){
    this.uploadSuccess=false;
    for(let file of this.files){
      this.uploadSuccess=false;
    this.service.uploadfile(file).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.uploadSuccess = true;
      }
    },
    err=>{console.log(err)}
    );
    }
  }

  downloadfile(){
    this.service.downloadfile().subscribe(response => {
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
