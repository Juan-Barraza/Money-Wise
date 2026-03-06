import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransactionResponse } from 'src/app/core/models/types/transaction.type';


@Component({
  selector: 'app-trasaction-detail-components',
  templateUrl: './trasaction-detail-components.component.html',
  styleUrls: ['./trasaction-detail-components.component.scss'],
  standalone: false,
})
export class TrasactionDetailComponentsComponent implements OnInit {
  @Input() transaction!: TransactionResponse;
  @Output() onEdit = new EventEmitter<TransactionResponse>();
  @Output() onDelete = new EventEmitter<void>();
  constructor() { }

  ngOnInit() { }


  public emitterClickEdit() {
    this.onEdit.emit(this.transaction);
  }

  public emitterClickDelete() {
    this.onDelete.emit();
  }

}
