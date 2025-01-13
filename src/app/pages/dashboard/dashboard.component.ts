import { Component, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardPageInfo, DashboardService } from '../../services/dashboard.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

// 1 - Ocorrências por tipo (Gráfico de barra)
// 2 - Meses com maior número de ocorrências (Gráfico de linha) 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatProgressSpinner,
  ]
})
export class DashboardComponent implements OnInit {
  public isLoading = signal(false);
  public pageData = signal<DashboardPageInfo | undefined>(undefined);

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartDatasets = [{
    data: [300, 500, 100]
  }];
  public pieChartLegend = true;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ["this.pageData()?.chart.months", "asdfasdfsd"],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: "Ocorrências" }
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.isLoading.set(true);
    this
      .dashboardService
      .getChartsInfo()
      .subscribe({
        next: (dashboardData) => this.pageData.set(dashboardData),
        complete: () => this.isLoading.set(false)
      })
  }

}
