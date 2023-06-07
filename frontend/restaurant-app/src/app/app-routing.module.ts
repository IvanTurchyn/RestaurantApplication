import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RoleGuard} from "./guards/role.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [RoleGuard], data: { role: 'CLIENT' } },
  { path: 'order', component: OrderComponent, canActivate: [RoleGuard], data: { role: 'WAITER' } },
  { path: 'user', component: UserComponent, canActivate: [RoleGuard], data: { role: 'MANAGER' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
