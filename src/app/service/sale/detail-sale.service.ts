import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class DetailSaleService {

  private productList:Product[]=[]
  private products:BehaviorSubject<Product[]>;
  
    constructor() {
      this.products=new BehaviorSubject<Product[]>([])
     }
  
     getProductSale(){
      return this.products.asObservable();
     }
     addProductSale(product:Product){
      product.amount=1;
      this.productList.push(product);
  
    this.products.next([...this.productList]);
     }
     deleteProductSale(id:string){
      let index = this.productList.findIndex( item => item._id === id)
      this.productList.splice(index,1);
      this.products.next(this.productList);
     }
  
  }