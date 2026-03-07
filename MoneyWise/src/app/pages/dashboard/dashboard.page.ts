import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardResponse } from 'src/app/core/models/types/dashboard.type';
import { AnalyticsServices } from 'src/app/core/services/analyticsServices/analytics-services';
import { AuthService } from 'src/app/core/services/authService/auth-service';
import { ToastService } from 'src/app/core/services/toast/toast';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  public dashboard: DashboardResponse | null = null;
  public isLoading: boolean = false;
  public userName?: string = '';

  constructor(private authservice: AuthService,
    private router: Router,
    private analityService: AnalyticsServices,
    private toast: ToastService,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authservice.currentUser$.subscribe(
      user => {
        this.userName = user?.name || 'Usuario';
      }
    )
    this.getDashboard();
  }


  public async logOut() {
    await this.authservice.logout();
    this.router.navigate(['/auth/login'])
  }

  public getDashboard() {
    this.isLoading = true;
    this.analityService.getDashboard().subscribe({
      next: async (response) => {
        this.isLoading = false;
        this.dashboard = response;
      },
      error: async (err) => {
        await this.toast.error(err.error?.error || 'Error al obtener el dashboard');
        this.isLoading = false;
      }
    })
  }

}
