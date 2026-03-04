import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/authService/auth-service';
import { StorageService } from './services/storageService/storage';
import { ToastService } from './services/toast/toast';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [AuthService, StorageService, ToastService]
})
export class CoreModule { }
