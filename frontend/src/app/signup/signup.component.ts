import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form;
  constructor(private userservice:UserService) { }
  
  ngOnInit(): void {
    this.form=new FormGroup({
      username : new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      password2: new FormControl('',[Validators.required])
    });

  }

 
  registeruser(){
    this.userservice.registeruser(JSON.stringify(this.form.value)).subscribe(
      response=>{
        alert(response);
      }
    );
  }

}
