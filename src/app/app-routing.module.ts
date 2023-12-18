import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {redirectUnauthorizedTo,redirectLoggedInTo,canActivate} from '@angular/fire/auth-guard'
import { AddProductPageModule } from './components/add-product/add-product.module';
import { AuthorizeGuard } from './guards/authorize.guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDash=()=>redirectLoggedInTo(['user-dashboard'])


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule),

  },
  {
    path: 'signup',
    loadChildren: () => import('./components/signup/signup.module').then( m => m.SignupPageModule)
  },

  {
    path: 'shop',
    loadChildren: () => import('./components/shop/shop.module').then( m => m.ShopPageModule),
    canActivate: [AuthorizeGuard]
  },

  {
    path: 'user-dashboard',
    loadChildren: () => import('./components/user-dashboard/user-dashboard.module').then(m => m.UserDashboardPageModule),
    canActivate: [AuthorizeGuard]
  },
  {
    path: 'user-dashboard/add-product',
    loadChildren: () => import('./components/add-product/add-product.module').then( m => m.AddProductPageModule),
    canActivate: [AuthorizeGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
