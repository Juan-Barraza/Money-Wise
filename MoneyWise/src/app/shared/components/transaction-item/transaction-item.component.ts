import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransactionResponse } from 'src/app/core/models/types/transaction.type'



@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  standalone: false,
})
export class TransactionItemComponent implements OnInit {
  @Input() transaction!: TransactionResponse;
  @Output() onClick = new EventEmitter<TransactionResponse>();
  constructor() { }

  ngOnInit() { }

  public emiterClick() {
    this.onClick.emit(this.transaction);
  }

}
