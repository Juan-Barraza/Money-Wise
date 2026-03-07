import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionModalPageRoutingModule } from './transaction-modal-routing.module';

import { TransactionModalPage } from './transaction-modal.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionModalPageRoutingModule,
    SharedModule,
  ],
  declarations: [TransactionModalPage]
})
export class TransactionModalPageModule {}
