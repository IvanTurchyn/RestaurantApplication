import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoleGuard } from './guards/role.guard';
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [RoleGuard], data: { role: 'CLIENT' } },
  { path: 'order', component: OrderComponent, canActivate: [RoleGuard], data: { role: 'WAITER' } },
  { path: 'user', component: UserComponent, canActivate: [RoleGuard], data: { role: 'MANAGER' } },
  { path: 'menu-position', component: MenuComponent, canActivate: [RoleGuard], data: { role: 'CHEF' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
