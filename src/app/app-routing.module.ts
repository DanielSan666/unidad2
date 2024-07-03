import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './component/users/list-user/list-user.component';
import { ListProductComponent } from './component/product/list-product/list-product.component';
import { LoginComponent } from './component/login/login/login.component';
import { VentasComponent } from './component/ventas/ventas/ventas.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'list-product', component: ListProductComponent, canActivate: [AuthGuard] },
  { path: 'list-user', component: ListUserComponent, canActivate: [AuthGuard]},
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard]},
  { path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
