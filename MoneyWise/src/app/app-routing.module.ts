import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';
import { publicGuard } from './core/guards/public/public-guard';

const routes: Routes = [
  {
    path: 'auth/login',
    canActivate: [publicGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'auth/register',
    canActivate: [publicGuard],
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },  {
    path: 'transaction-modal',
    loadChildren: () => import('./pages/transaction/transactionModal/transaction-modal.module').then( m => m.TransactionModalPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
