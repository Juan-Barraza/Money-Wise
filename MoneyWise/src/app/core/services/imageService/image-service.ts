import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IImage } from 'src/app/core/models/types/transaction.type'



@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl: string = environment.API_URL;

  constructor(private readonly http: HttpClient) { }


  public saveImage(file: File): Observable<IImage> {
    const formmData = new FormData();
    formmData.append('file', file)
    return this.http.post<IImage>(`${this.apiUrl}/images`, formmData)
  }
}
