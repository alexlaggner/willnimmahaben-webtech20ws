import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  activeUserName: string = "";
  checkIfLogged: boolean = false;

  constructor(private usersService : UsersService) { }
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem('active_user');

    window.location.reload();

  }

  ngOnInit(): void {
    this.activeUserName =localStorage.getItem('active_user');
    if(this.activeUserName != null){
      this.checkIfLogged=true;
    }
  }

}
