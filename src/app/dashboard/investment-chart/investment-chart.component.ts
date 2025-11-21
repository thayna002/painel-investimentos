import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { InvestmentService } from '../../services/investment.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-investment-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment-chart.component.html',
  styleUrl: './investment-chart.component.scss',
})
export class InvestmentChartComponent implements AfterViewInit {

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart?: Chart;

  constructor(
    private investmentService: InvestmentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // carrega qudo a VIEW EXISTE
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadChartData();
  }

  loadChartData() {
  const clientId = Number(localStorage.getItem("clientId"));

  this.investmentService.getInvestments(clientId).subscribe((data: any[]) => {

    const sorted = data.sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const labels = sorted.map(inv =>
      new Date(inv.date).toLocaleDateString('pt-BR')
    );

    const values = sorted.map(inv => inv.value);

    setTimeout(() => {
      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Investimentos',
            data: values,
            borderColor: '#093672',
            backgroundColor: 'rgba(9, 54, 114, 0.3)',
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } },
          plugins: { legend: { display: false } }
        }
      });
    });
  });
}

}
