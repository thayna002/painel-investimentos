import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-investment-simulator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './investment-simulator.component.html',
  styleUrl: './investment-simulator.component.scss'
})
export class InvestmentSimulatorComponent implements OnInit, OnChanges {

  @Input() product: any;

  simulationForm!: FormGroup;

  result: any = null;
  history: any[] = [];
  rate: number = 0;


  constructor(private fb: FormBuilder, private investmentService: InvestmentService) {}

  ngOnInit(): void {
    this.simulationForm = this.fb.group({
      value: [null, [Validators.required, Validators.min(1)]],
      months: [null, [Validators.required, Validators.min(1)]],
      type: [{ value: '', disabled: true }, Validators.required]  
    });

    this.history = this.investmentService.getSimulationHistory();
  }

ngOnChanges(changes: SimpleChanges) {
  if (changes['product'] && this.product) {

    this.rate = this.product.profitability;   

    this.simulationForm.patchValue({
      type: this.product.type
    });

    setTimeout(() => {
      document.getElementById('simulator-card')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 50);
  }
}


  simulate() {
    if (this.simulationForm.invalid) return;

    const { value, months } = this.simulationForm.getRawValue();
    const annualRate = this.rate || 0.12; // fallback
    const monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;
    const finalValue = value * Math.pow(1 + monthlyRate, months);

    const totalProfitability = (finalValue - value) / value;

    this.result = {
      finalValue: Number(finalValue.toFixed(2)),
      profitability: totalProfitability,
      details: `Simulação baseada em ${this.product?.name ?? 'produto'} com ${(annualRate*100).toFixed(2)}% ao ano.`
    };

    const entry = {
      createdAt: new Date(),
      type: this.product?.type,
      value,
      finalValue: this.result.finalValue,
      months,
      rate: annualRate,
      details: this.result.details 
    };

    const history = this.investmentService.getSimulationHistory();
    history.push(entry);
    localStorage.setItem('simulations', JSON.stringify(history));
    this.history = history;
  }


  clearHistory() {
    this.investmentService.clearSimulationHistory();
    this.history = [];
  }
}
