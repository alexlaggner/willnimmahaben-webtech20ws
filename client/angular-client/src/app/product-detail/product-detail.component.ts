import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {ProductsService} from '../products.service';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetail: Product = new Product;
  constructor(private productsService : ProductsService, private route: ActivatedRoute, private http: HttpClient) { }

  id: string="";
  imgsrc : string="";

  getProduct (): void{
    this.productsService.getProductById(this.id).subscribe((data)=>{
    this.productDetail=data;
    }, (err) =>{
      console.log(err);
    })
  } 
  getImageSrc():void{
    this.http.get<any>(this.productDetail.fotourl).subscribe((data)=>{
      //this.imgsrc=data;
      console.log(data);
    })
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.getProduct();
    this.getImageSrc();
    this.imgsrc=this.productDetail.fotourl;
  }

}
