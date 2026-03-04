import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { IonicModule } from "@ionic/angular";
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoadingButtonComponent, InputComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [LoadingButtonComponent
    , InputComponent,
    ReactiveFormsModule]
})
export class SharedModule { }
