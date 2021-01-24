import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {Product} from '../product';
import {ProductsService} from '../products.service';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  productList: Product []=null;
  
  token: string = localStorage.getItem('id_token');

  mockProduct: Product  =   {
  "fotourl": "mockURL",
  "name": "Mock",
  "beschreibung": "Mockbeschreibung",
  "kontakt": "mock@gmail.com",
  "auto" : "1",
  "elektronik": "0",
  "haushalt" : "0",
  "andere" : "0"
  };

  public getProducts(): void{
   this.productService.getProducts().subscribe((data: Product[]) => {
      this.productList = data;
    }), ((err) => {
      console.log(err);
    });
  }
  public getProductsByCategory(cat : string) : void{
    this.productService.getProductsByCategory(cat).subscribe((data: Product []) =>{
      this.productList = data;
    }),((err) =>{
      console.log(err);
    });
  }




  constructor(public productService : ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

}
