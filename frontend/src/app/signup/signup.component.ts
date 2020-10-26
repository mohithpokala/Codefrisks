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
  form:FormGroup;
  userlist:User[]=[];
  success:boolean=false;
  constructor(private userservice:UserService) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      username : new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    });

  }

  registeruser(){
    this.userservice.registeruser(this.form.value).subscribe(user=>this.userlist.push(user))
  }

}
