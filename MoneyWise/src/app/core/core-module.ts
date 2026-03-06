import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/authService/auth-service';
import { StorageService } from './services/storageService/storage';
import { ToastService } from './services/toast/toast';
import { AnalyticsServices } from './services/analyticsServices/analytics-services';
import { TransactionServices } from './services/transactionservices/transactionservices';
import { CategoryService } from './services/catergoryService/category-service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [AuthService,
    StorageService,
    ToastService,
    AnalyticsServices,
    TransactionServices,
    CategoryService,
  ]
})
export class CoreModule { }
