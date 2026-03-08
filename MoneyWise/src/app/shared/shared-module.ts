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
import { DateFormatPipe } from './pipes/dateformat/date-format-pipe';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { FilterBarComponent } from './components/filterBar/filter-bar.component';
import { TrasactionDetailComponentsComponent } from '../shared/components/trasactionDetailComponents/trasaction-detail-components.component'
import { PhotoSelectorComponent } from './components/photoSelector/photo-selector.component'
import { TransactionFormComponent } from './components/transactionForm/transaction-form.component';
@NgModule({
  declarations: [
    LoadingButtonComponent,
    InputComponent,
    DashboardCardComponent,
    ProgressBarCategoryComponent,
    CurrencyFormatPipe,
    MonthNamePipe,
    DateFormatPipe,
    TransactionItemComponent,
    FilterBarComponent,
    TrasactionDetailComponentsComponent,
    PhotoSelectorComponent,
    TransactionFormComponent,
  ],
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
    DateFormatPipe,
    TransactionItemComponent,
    FilterBarComponent,
    TrasactionDetailComponentsComponent,
    PhotoSelectorComponent,
    TransactionFormComponent
  ]
})
export class SharedModule { }
