// transaction-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/core/models/types/category.type';
import { TransactionRequest, TransactionResponse } from 'src/app/core/models/types/transaction.type';
import { CategoryService } from 'src/app/core/services/catergoryService/category-service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  standalone: false,
})
export class TransactionFormComponent implements OnInit {
  @Input() transaction: TransactionResponse | null = null;
  @Output() onSave = new EventEmitter<{ data: TransactionRequest, file?: File }>();
  @Output() onCancel = new EventEmitter<void>();

  public transactionForm!: FormGroup;
  public categories: ICategory[] = [];
  public isLoading: boolean = false;
  public photoDataUrl: string | null = null;
  public photoFile: File | undefined = undefined;
  public today = new Date().toISOString();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getCategories();
    if (this.transaction?.image?.url) {
      this.photoDataUrl = this.transaction.image.url;
    }
  }


  public onPhotoSelected(event: { dataUrl: string, file: File }) {
    this.photoDataUrl = event.dataUrl;
    this.photoFile = event.file;
  }

  public onPhotoRemoved() {
    this.photoDataUrl = null;
    this.photoFile = undefined;
  }

  public submit() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }
    const formValue = this.transactionForm.value;
    const dateCOL = new Date(formValue.date);
    const offset = dateCOL.getTimezoneOffset() * 60000;
    formValue.date = new Date(dateCOL.getTime() - offset).toISOString().split('.')[0] + 'Z';
    formValue.amount = Number(formValue.amount);
    this.onSave.emit({
      data: formValue,
      file: this.photoFile
    });
  }

  public cancel() {
    this.onCancel.emit();
  }

  get titleError() {
    return this.transactionForm.get('title')?.touched && this.transactionForm.get('title')?.hasError('required')
      ? 'El título es requerido' : '';
  }

  get amountError() {
    const ctrl = this.transactionForm.get('amount');
    if (ctrl?.touched && ctrl.hasError('required')) return 'El monto es requerido';
    if (ctrl?.touched && ctrl.hasError('min')) return 'El monto debe ser mayor a 0';
    return '';
  }


  get categoryError() {
    return this.transactionForm.get('category_id')?.touched &&
      this.transactionForm.get('category_id')?.hasError('required')
      ? 'La categoría es requerida' : '';
  }

  private initForm() {
    this.transactionForm = this.fb.group({
      type: [this.transaction?.type || 'expense', Validators.required],
      category_id: [this.transaction?.category?.id || '', Validators.required],
      title: [this.transaction?.title || '', Validators.required],
      amount: [this.transaction?.amount || '', [Validators.required, Validators.min(1)]],
      date: [this.transaction?.date || this.getLocateISO(), Validators.required],
      description: [this.transaction?.description || ''],
    });
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: () => { }
    });
  }

  private getLocateISO() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().split('.')[0];
  }
}
