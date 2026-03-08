import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/authService/auth-service';
import { StorageService } from './services/storageService/storage';
import { ToastService } from './services/toast/toast';
import { AnalyticsServices } from './services/analyticsServices/analytics-services';
import { TransactionServices } from './services/transactionservices/transactionservices';
import { CategoryService } from './services/catergoryService/category-service';
import { CameraService } from './services/cameraService/camera-service';
import { ImageService } from './services/imageService/image-service';



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
    CameraService,
    ImageService,
  ]
})
export class CoreModule { }
