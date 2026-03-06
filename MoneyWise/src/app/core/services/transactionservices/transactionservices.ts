import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TransactionRequest, TransactionResponse, TransactionPaginated, TransactionFilters } from '../../models/types/transaction.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionServices {
  private apiURl: string = environment.API_URL;

  constructor(private readonly http: HttpClient,) { }



  public getTransactions(filters?: TransactionFilters): Observable<TransactionPaginated> {
    let params = new HttpParams();
    if (filters?.type) params = params.set('type', filters.type);
    if (filters?.category_id) params = params.set('category_id', filters.category_id);
    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.date_from) params = params.set('date_from', filters.date_from);
    if (filters?.date_to) params = params.set('date_to', filters.date_to);
    if (filters?.page) params = params.set('page', filters.page);
    if (filters?.limit) params = params.set('limit', filters.limit || 10);

    return this.http.get<TransactionPaginated>(`${this.apiURl}/transactions`, { params });
  }

  public getDetails(id: number): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(`${this.apiURl}/transactions/${id}`);
  }

  public saveTransaction(data: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.apiURl}/transactions`, data);
  }
  public updateTransaction(data: TransactionRequest, id: number): Observable<TransactionResponse> {
    return this.http.put<TransactionResponse>(`${this.apiURl}/transactions/${id}`, data);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURl}/transactions/${id}`);
  }

}
