import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListPreviewComponent } from './product/product-list-preview/product-list-preview.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { OrderSummaryComponent } from './order/order-summary/order-summary.component';
import { OrderSuccessComponent } from './order/order-success/order-success.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/products/preview', pathMatch: 'full' },
  { path: 'products/preview', component: ProductListPreviewComponent ,canActivate: [AuthGuard]},
  { path: 'products', component: ProductListComponent ,canActivate: [AuthGuard], data: { expectedRole: 'admin' }},
  { path: 'cart', component: OrderSummaryComponent,canActivate: [AuthGuard] },
  { path: 'order-success', component: OrderSuccessComponent ,canActivate: [AuthGuard]},
  { path: 'order-list', component: OrderListComponent,canActivate: [AuthGuard] , data: { expectedRole: 'admin' }},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/products/preview' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
