import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionModalPage } from './transaction-modal.page';

describe('TransactionModalPage', () => {
  let component: TransactionModalPage;
  let fixture: ComponentFixture<TransactionModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
