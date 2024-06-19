import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './component/users/list-user/list-user.component';
import { ListProductComponent } from './component/product/list-product/list-product.component';

const routes: Routes = [
  { path: '', component: ListProductComponent },
  { path: 'list-user', component: ListUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
