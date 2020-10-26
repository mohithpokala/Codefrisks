import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;
  loginform:FormGroup;
  constructor(private userservice:UserService) { }

  ngOnInit(): void {
    this.loginform=new FormGroup({
      username : new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }
  loginuser(){
    this.userservice.loginuser(this.loginform)
  }

}
