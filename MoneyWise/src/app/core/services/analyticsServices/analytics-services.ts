import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DashboardResponse } from 'src/app/core/models/types/dashboard.type'

@Injectable({
  providedIn: 'root',
})
  export class AnalyticsServices {
    private apiUrl: string = environment.API_URL;

    constructor(private readonly http: HttpClient) { }

    public getDashboard(): Observable<DashboardResponse> {
      return this.http.get<DashboardResponse>(`${this.apiUrl}/analytics/dashboard`);
    }
  }
