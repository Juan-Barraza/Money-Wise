import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TransactionResponse } from 'src/app/core/models/types/transaction.type';
import { TransactionServices } from 'src/app/core/services/transactionservices/transactionservices';
import { ToastService } from 'src/app/core/services/toast/toast';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
  standalone: false,
})
export class TransactionDetailPage implements OnInit {
  public transaction: TransactionResponse | null = null;
  public isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionServices,
    private toast: ToastService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.getDetail(Number(id));
  }


  public async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar transacción',
      message: '¿Estás seguro que deseas eliminar esta transacción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.deleteTransaction()
        }
      ]
    });
    await alert.present();
  }

  private deleteTransaction() {
    this.transactionService.delete(this.transaction!.id).subscribe({
      next: async () => {
        await this.toast.success('Transacción eliminada');
        this.router.navigate(['/tabs/transaction'], { replaceUrl: true });
      },
      error: async (err) => {
        await this.toast.error(err.error?.error || 'Error al eliminar');
      }
    });
  }

  public goToEdit(event?:Event) {

  }

  public goBack() {
    this.router.navigate(['/tabs/transaction'])
  }

  private getDetail(id: number) {
    this.isLoading = true;
    this.transactionService.getDetails(id).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.transaction = response;
      },
      error: async (err) => {
        await this.toast.error(err.error?.error || 'Error al obtener la transaccion');
        this.isLoading = false;
        this.router.navigate(['/tabs/transaction'])
      }
    })
  }

}
