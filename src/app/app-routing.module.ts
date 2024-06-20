import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './component/users/list-user/list-user.component';
import { ListProductComponent } from './component/product/list-product/list-product.component';
import { LoginComponent } from './component/login/login/login.component';

const routes: Routes = [
  { path: 'list-product', component: ListProductComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
