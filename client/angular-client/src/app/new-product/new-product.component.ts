import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {Product} from '../product';
import {User} from '../user';
import {ProductsService} from '../products.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  constructor(private productService : ProductsService, private http:HttpClient, private usersService: UsersService) { }
  activeUser: User = new User;
  activeUserName: string = "";

  checkIfUpload: boolean =false;

  addProduct : Product= {
    "fotourl": "",
    "name" : "",
    "kontakt": "",
    "beschreibung": "",
    "auto": "0",
    "elektronik": "0",
    "haushalt" : "0",
    "andere": "0"
  };

  newProductName: string ="";
  newProductUrl: string="";
  newProductDescr: string="";
  newProductCar: boolean;
  newProductElek: boolean;
  newProductHaus: boolean;
  newProductAndere: boolean;
  
  selectedFile :File = null;



  onFileSelected(event):void{
    if(event.target.files.length >0){
      this.selectedFile = event.target.files[0];
    }
  }

  onUpload() : void{
    let imageName : string = "";
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    const baseURL :string = "http://localhost:3000/upload";
    this.http.post<any>(baseURL, formData).subscribe(
      (res)=>{
        
        this.newProductUrl ="http://localhost:3000/Pictures/"+ res.filename;
        this.checkIfUpload =true;
      },
      (err)=>console.log(err)
    );
    
  }
   getActiveUser(): void{
    if(this.activeUserName != ""){
    this.usersService.getUserByUsername(this.activeUserName).subscribe((data) =>{
      this.activeUser = data[0];
    }, (err) =>{
      window.alert("err");
    })
  }
  }
   newProduct(): void{
    //Set up new product
    this.addProduct.fotourl = this.newProductUrl;
    this.addProduct.name= this.newProductName;
    this.addProduct.beschreibung=this.newProductDescr;
    this.addProduct.kontakt=this.activeUser.email;
    if(this.newProductCar == true){
      this.addProduct.auto = "1";
    } 
    if(this.newProductElek==true){
      this.addProduct.elektronik = "1";
    } 
    if(this.newProductHaus == true){
      this.addProduct.haushalt ="1";
    } 
    if(this.newProductAndere==true){
      this.addProduct.andere="1";
    }
    

    this.productService.newProduct(this.addProduct).subscribe((added : Product) =>{
      window.alert(added.name + " was added");
    });
  }
  ngOnInit(): void {
    this.activeUserName= localStorage.getItem('active_user');
    this.getActiveUser();
  }
  

}
