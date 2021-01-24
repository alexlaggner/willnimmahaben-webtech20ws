import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UsersService} from '../users.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  newUser: User = {
    "userName" : "",
    "email" : "",
    "passWord" : "",
    "tel":""
  }
  newUserName: string = "";
  newUserPassword: string = "";
  newUserPasswordConfirm: string ="";
  newUserEmail: string  ="";
  newUserTel: string  ="";

  isCreated: boolean = false;

  createUser() :void{
    if(this.newUserPassword == this.newUserPasswordConfirm){
      this.newUser.userName =this.newUserName;
      this.newUser.email = this.newUserEmail;
      this.newUser.passWord = this.newUserPassword;
      this.newUser.tel = this.newUserTel;
      this.isCreated = true;
      this.usersService.newUser(this.newUser).subscribe((data)=>{
        
        console.log(data);
      });
    } else {
      window.alert("Passwords don't match");
    }
  }

  constructor(private usersService : UsersService) { }

  ngOnInit(): void {
  }

}
