import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../model/product';
import { ListProductComponent } from '../component/product/list-product/list-product.component';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  formGroup!: FormGroup

  constructor(public dialogRef: MatDialogRef<ListProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private formBuilder:FormBuilder,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    if(!this.data){
      this.formGroup=this.formBuilder.group({
        name:["", Validators.required],
        code:["", Validators.required],
        category:["", Validators.required],
        description:["", Validators.required],
        price:["", Validators.required],
        amount:["", Validators.required]
      });
    }else{
      this.formGroup=this.formBuilder.group({
        name:[this.data.name||"", Validators.required],
        code:[this.data.code||"", Validators.required],
        category:[this.data.category||"",Validators.required],
        description:[this.data.description||"", Validators.required],
        price:[this.data.price||"", Validators.required],
        amount:[this.data.amount||"",Validators.required],
      })
    }
  }

  onSave() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

save(): void{

  let request={
    id:this.data!=null?this.data._id:null,
    name:this.formGroup.value.name,
    code:this.formGroup.value.code,
    category:this.formGroup.value.category,
    price:this.formGroup.value.price,
    amount:this.formGroup.value.amount,
    description:this.formGroup.value.description,
  }
  try{
      if (!this.data){
        this.productService.addProduct(request)                       
        .subscribe((item: any)=>console.log(item))
      }else{
        this.productService.editProduct(request)
        .subscribe((item: any)=>console.log(item))
      }
      this.dialogRef.close(true)
  }catch(error){
    console.log(error);
    
  }
}

}
