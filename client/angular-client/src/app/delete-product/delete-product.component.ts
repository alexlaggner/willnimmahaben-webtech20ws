import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service'
import {Product} from '../product';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  deleteId: string;
  productToDelete:  Product;
  outputString: string;

  productCheck: boolean;

  constructor(private productsService:ProductsService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.deleteId=this.route.snapshot.paramMap.get('id');
    this.getProduct();
    if(this.productToDelete == null){
      this.productCheck = false;
    }
    else{
      this.productCheck=true;
    }
  }

  getProduct():void{
    this.productsService.getProductById(this.deleteId).subscribe((data) =>{
      this.productToDelete=data;
    },(err)=>{
      this.productToDelete=null;
    })
  }

  deleteProduct(): void{
    if(this.productToDelete != null){
    this.productsService.deleteProduct(this.deleteId).subscribe((data:string)=>{
      this.outputString =this.productToDelete.name + " wurde erfolgreich gelöscht!";
    },(err) =>{
      this.outputString=this.productToDelete.name+ " wurde erfolgreich gelöscht!";
    });
    
    } else {
      this.outputString="Ups! Da ist etwas schief gegangen!";
    }
  }
}
