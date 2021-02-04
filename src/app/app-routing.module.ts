import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security/security.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: 'login', component:SecurityComponent},
  {path: 'users', component:UsersComponent},

  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
