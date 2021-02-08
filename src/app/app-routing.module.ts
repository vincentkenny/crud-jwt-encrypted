import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SecurityComponent } from './security/security.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: 'login', component:SecurityComponent},
  {path: 'users', component:UsersComponent},
  {path: 'products', component:ProductsComponent},
  {path: 'purchases', component:PurchasesComponent},

  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
