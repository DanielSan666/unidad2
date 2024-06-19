import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import { Product } from 'src/app/model/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from 'src/app/product-form/product-form.component';
import { ConfirmacionComponent } from 'src/app/confirmacion/confirmacion.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  close() {
    this.closeSidenav.emit();
  }

  productList!: MatTableDataSource<Product>;
  columnsHeader=["date","name","price","amount","status","opciones"]

  constructor(private productService:ProductService, 
    public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.productListMethod();
  }

  productListMethod(){
    try{
    this.productService.getProducts()
    .subscribe(item => this.productList= new MatTableDataSource(item))
    
    }catch(error){
    console.log(error)
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.productList.filter=filterValue.trim();
  }
  
  openDialog(){
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: any) =>{
      console.log('The dialog was closed');
      if (result){
        this.productListMethod();
      }
      
    });
  }

  deleteDialog(id:string) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      data: null,
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
     if(result){
      this.deleteProduct(id)
     }
    });
  }
  
  deleteProduct(id:string){
    try{
    this.productService.delete(id).subscribe(item=>console.log(item))
    this.productListMethod();
  
    }catch(error){
  
    }
  }
  
  editDialog(element:Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: element,
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
     if(result){
      this.productListMethod();
     }
    });
  }
  
  
  }