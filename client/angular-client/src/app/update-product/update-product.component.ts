import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {ProductsService} from '../products.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  updateId: string;
  productToUpdate: Product=new Product;
  checkProduct : boolean = true;
  outputString: string;

  convertAuto: boolean;
  convertElektronik: boolean;
  convertHaushalt: boolean;
  convertAndere: boolean;

  updatedProduct : Product = new Product;
  updateName: string;
  updateBeschreibung: string;
  updateAuto: boolean;
  updateElektronik: boolean;
  updateHaushalt: boolean;
  updateAndere: boolean;

  updatedCheck: boolean =true;
  showForm: boolean = true;

  constructor(private productsService : ProductsService, private route:ActivatedRoute) { }

  getProduct() : void{
    this.productsService.getProductById(this.updateId).subscribe((data) =>{
      this.productToUpdate = data;
    }, (err) =>{
      console.log(err);
    })
  }
  /*
  convertBoolean(): void{
    if(this.productToUpdate.auto === ('1')){
      this.convertAuto =true;
    } else {
      this.convertAuto =false;
    }
    if(this.productToUpdate.elektronik ==="1"){
      this.convertElektronik = true;
    } else {
      this.convertElektronik = false;
    }
    if(this.productToUpdate.haushalt ==="1"){
      this.convertHaushalt = true;
    }else {
      this.convertHaushalt = false;
    }
    if(this.productToUpdate.andere === "1"){
      this.convertAndere = true;
    } else {
      this.convertAndere = false;
    }
  }*/
  updateProduct(): void{
    this.updatedProduct.id=this.productToUpdate.id;
    this.updatedProduct.name=this.updateName;
    this.updatedProduct.beschreibung=this.updateBeschreibung;
    this.updatedProduct.kontakt =this.productToUpdate.kontakt;
    this.updatedProduct.fotourl = this.productToUpdate.fotourl;
   
    if(this.updateAuto == true){
      this.updatedProduct.auto="1";
    } else {
      this.updatedProduct.auto="0";
    }
    if(this.updateElektronik == true){
      this.updatedProduct.elektronik = "1";
    } else {
      this.updatedProduct.elektronik ="0";
    }
    if(this.updateHaushalt == true){
      this.updatedProduct.haushalt ="1";
    } else {
      this.updatedProduct.haushalt="0";
    }
    if(this.updateAndere == true){
      this.updatedProduct.andere ="1";
    } else {
      this.updatedProduct.andere="0";
    }
    
    this.productsService.updateProduct(this.updatedProduct).subscribe((data)=>{
      this.outputString =this.updatedProduct.name+ " wurde aktualisiert";
      console.log(JSON.stringify(data));
    }, (err) =>{
      this.outputString=this.updatedProduct.name+" wurde aktualisiert";
      this.updatedCheck=false;
    });
    this.showForm = false;
  }

  ngOnInit(): void {
    this.updateId=this.route.snapshot.paramMap.get('id');
    this.getProduct();
    
    //this.convertBoolean();
  }

}
