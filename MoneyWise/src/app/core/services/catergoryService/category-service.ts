import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../../models/types/category.type';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiiUrl: string = environment.API_URL;

  constructor(private readonly http: HttpClient) {}


  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiiUrl}/categories`);
  }
}
