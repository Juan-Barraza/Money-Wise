import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [

      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module')
          .then(m => m.DashboardPageModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('../transaction/transaction.module').then(m => m.TransactionPageModule)
      },
      {
        path: 'transaction-detail/:id',
        loadChildren: () => import('../trasactionDetail/transaction-detail.module').then(m => m.TransactionDetailPageModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
