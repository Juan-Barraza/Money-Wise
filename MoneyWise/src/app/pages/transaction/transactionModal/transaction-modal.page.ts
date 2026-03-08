import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionRequest, TransactionResponse } from 'src/app/core/models/types/transaction.type';
import { ImageService } from 'src/app/core/services/imageService/image-service';
import { ToastService } from 'src/app/core/services/toast/toast';
import { TransactionServices } from 'src/app/core/services/transactionservices/transactionservices';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.page.html',
  styleUrls: ['./transaction-modal.page.scss'],
  standalone: false,
})
export class TransactionModalPage implements OnInit {
  public isLoading: boolean = false;
  public transaction: TransactionResponse | null = null;

  constructor(
    private modalCtrl: ModalController,
    private transactionService: TransactionServices,
    private imageService: ImageService,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  public onSave(event: { data: TransactionRequest, file?: File }) {
    this.isLoading = false;
    const { data, file } = event;

    if (!file && this.transaction?.image?.id) {
      data.image_id = this.transaction.image.id;
      this.saveTransaction(data);
      return;
    }

    if (file) {
      this.imageService.saveImage(file).subscribe({
        next: (image) => {
          data.image_id = image.id;
          this.saveTransaction(data);
        },
        error: async (err) => {
          this.isLoading = false;
          await this.toast.error(err.error?.error || 'Error al subir imagen');
        }
      });
    } else {
      this.saveTransaction(data);
    }
  }

  public onCancel() {
    this.modalCtrl.dismiss({ save: false })
  }

  private saveTransaction(data: TransactionRequest) {
    const request = this.transaction
      ? this.transactionService.updateTransaction(data, this.transaction.id)
      : this.transactionService.saveTransaction(data);

    request.subscribe({
      next: async () => {
        this.isLoading = false;
        await this.toast.success(
          this.transaction ? 'Transacción actualizada' : 'Trasacción guardada'
        );
        this.modalCtrl.dismiss({ saved: true });
      },
      error: async (err) => {
        this.isLoading = false;
        await this.toast.error(err.error?.errror || 'Error al guardar');
      }
    });
  }

}
