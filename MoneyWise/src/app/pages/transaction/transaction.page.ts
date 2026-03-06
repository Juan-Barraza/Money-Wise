import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ICategory } from 'src/app/core/models/types/category.type';
import { TransactionFilters, TransactionResponse } from 'src/app/core/models/types/transaction.type';
import { CategoryService } from 'src/app/core/services/catergoryService/category-service';
import { ToastService } from 'src/app/core/services/toast/toast';
import { TransactionServices } from 'src/app/core/services/transactionservices/transactionservices';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
  standalone: false,
})
export class TransactionPage implements OnInit {
  public transactions: TransactionResponse[] = [];
  public categories!: ICategory[];
  public hasMore: boolean = true;
  public currentPage: number = 1;
  public filters: TransactionFilters = { page: 1, limit: 10 };
  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private transactionService: TransactionServices,
    private toast: ToastService,
    private categoriesService: CategoryService,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.resetAndLoad();
    this.getCategories();
  }



  public getAllTransaction(event?: InfiniteScrollCustomEvent) {
    this.isLoading = true;
    this.transactionService.getTransactions(this.filters).subscribe({
      next: async (response) => {
        this.isLoading = false;
        this.transactions = [...this.transactions, ...response.data];
        this.hasMore = this.currentPage < response.total_pages;
        event?.target.complete();
      },
      error: async (err) => {
        await this.toast.error(err.error?.error || 'Error al obtener las transacciones');
        this.isLoading = false;
        event?.target.complete();
      }
    })
  }

  public getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => this.categories = response,
      error: async (err) => {
        await this.toast.error(err.error?.error || 'Error al obtener categorias')
      }
    })
  }

  public loadMore(event: any) {
    this.currentPage++;
    this.filters.page = this.currentPage;
    this.getAllTransaction(event);
  }

  public onTypeChange(type: string) {
    this.filters.type = type === 'all' ? undefined : type;
    this.resetAndLoad();
  }

  public onCategoryChange(categoryId: number) {
    this.filters.category_id = categoryId || undefined;
    this.resetAndLoad();
  }

  public onSearchChange(search: string) {
    this.filters.search = search;
    this.resetAndLoad();
  }


  public goToDetail(trasaction: TransactionResponse) {
    this.router.navigate(['/tabs/transaction', trasaction.id]);
  }

  // resetea y carga desde página 1
  private resetAndLoad() {
    this.transactions = [];
    this.currentPage = 1;
    this.hasMore = true;
    this.filters!.page = 1;
    this.getAllTransaction();
  }


}
