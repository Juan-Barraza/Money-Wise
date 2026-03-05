import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { IonicModule } from "@ionic/angular";
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardCardComponent } from 'src/app/shared/components/dashboard-card/dashboard-card.component'
import { ProgressBarCategoryComponent } from 'src/app/shared/components/progress-bar-category/progress-bar-category.component'
import { CurrencyFormatPipe } from './pipes/currencyformat/currency-format-pipe';
import { MonthNamePipe } from './pipes/monthname/month-name-pipe';

@NgModule({
  declarations: [
    LoadingButtonComponent,
    InputComponent,
    DashboardCardComponent,
    ProgressBarCategoryComponent,
    CurrencyFormatPipe,
    MonthNamePipe],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [LoadingButtonComponent
    , InputComponent,
    ReactiveFormsModule,
    DashboardCardComponent,
    ProgressBarCategoryComponent,
    CurrencyFormatPipe,
    MonthNamePipe,

  ]
})
export class SharedModule { }
