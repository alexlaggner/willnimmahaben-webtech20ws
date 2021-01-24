import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UsersService} from '../users.service'
import {Observable} from 'rxjs';
import { ProductsService } from '../products.service';
import {Product} from '../product';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  activeUserName: string ="";
  activeUser: User = new User;

  updateUser: User =new User;
  updateName:string="";
  updatePassword: string="";
  updateTel: string="";

  oldPw:String="";

  checkIfUpdate: boolean = false;
  checkIfUser : boolean = false;

  activeUsersProducts: Product [] = null;

  constructor(private usersService:  UsersService, private productsService : ProductsService) { 
    
}
logout() {
  localStorage.removeItem("id_token");
  localStorage.removeItem('active_user');
}

  public getActiveUser(): void{
    if(this.activeUserName != ""){
    this.usersService.getUserByUsername(this.activeUserName).subscribe((data) =>{
      this.activeUser.id = data[0].id;
      this.activeUser.userName=data[0].username;
      this.activeUser.passWord=data[0].password;
      this.activeUser.email=data[0].email;
      this.activeUser.tel=data[0].tel;

      this.getUsersProducts();

      this.updateUser=this.activeUser;
      
    }, (err) =>{
      window.alert("err");
    })
  }

  }
  public userUpdate():void{
    if(this.checkPw() == true){
    if(this.updateName != ""){
    this.updateUser.userName =this.updateName;
    }
    if(this.updatePassword != ""){
    this.updateUser.passWord= this.updatePassword;
    }
    if(this.updateTel != ""){
    this.updateUser.tel = this.updateTel;
    }

     this.usersService.updateUser(this.updateUser).subscribe((data) =>{
      console.log(data);
      localStorage.removeItem('active_user');
      localStorage.setItem('active_user', this.updateUser.userName);
      
    }, (err) =>{
      console.log(err);
    }) ;
     this.checkIfUpdate = true;
     this.logout();

  } else {
    window.alert("Altes Passwort nicht korrekt!");
  }
  
}
   checkPw():boolean{
    if(this.activeUser.passWord === this.oldPw){
      return true;
    } else{
      return false;
    }
  }
  getUsersProducts () :void{
    this.productsService.getProductsByUser(this.activeUser.email).subscribe((data)=>{
      this.activeUsersProducts = data;
    },(err) =>{
     console.log(err);
    })
  }

  ngOnInit(): void {
    this.activeUserName = localStorage.getItem('active_user');
    this.getActiveUser();   
    if(this.activeUserName != undefined){
      this.checkIfUser = true;
    }
    this.updateUser=this.activeUser;
  }
}
