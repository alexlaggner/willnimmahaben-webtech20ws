import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UsersService} from '../users.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
  }
  loginUser: User={
    userName: "",
    passWord: ""
  }
  loginName: string = "";
  loginPw: string = "";

  sessionId: string = "";
  token: string  ="";

  authentificationError: boolean = false;

  activeUser: string  = localStorage.getItem('active_user');

  login() : void{
    this.loginUser.userName = this.loginName;
    this.loginUser.passWord = this.loginPw;

    this.usersService.login(this.loginUser).subscribe((data) =>{
      console.log(data);
      console.log("do gehts");
     if(data){
      this.sessionId = data;
      if(this.sessionId != ""){

      this.setSession(data);
      window.location.reload();
    }
  }    
  });
}

  private setSession(authResult) : void{
    localStorage.setItem('id_token', authResult);
    this.token = localStorage.getItem('id_token');
    localStorage.setItem('active_user', this.loginUser.userName);
    
  }
}
