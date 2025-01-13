import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { delay, Observable, of } from 'rxjs';

export interface DashboardPageInfo {
  bar: ChartData<'bar'>;
  pie: {
    ocurrencyNames: string[];
    dataset: {
      label: string;
      data: number[]
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private mockResult: Observable<DashboardPageInfo> = of({
    bar: {
      labels: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ],
      datasets: [{
        label: "Ocorrências",
        data: [65, 59, 80, 81, 56, 55, 40, 67, 86, 90, 87, 32]
      }]
    },
    pie: {
      ocurrencyNames: ["Erro de Sistema", "Falha de Rede", "Desempenho Baixo"],
      dataset: {
        label: "Ocorrências",
        data: [45, 25, 30]
      }
    }
  });


  getChartsInfo(): Observable<DashboardPageInfo> {
    return this
      .mockResult
      .pipe(delay(2000));
  }
}
