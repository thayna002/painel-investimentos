import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private http: HttpClient) {}

  
  // pega investimentos no json 
  getInvestments(clientId: number) {
    return this.http.get<any>('/assets/mocks/investments.json').pipe(
      map((all: any) => all[clientId] ?? [])
    );
  }

  //busca os produtoss do perfil
   getRecommendedProducts(profile: string): Observable<ProductModel[]> {
  return this.http.get<any>('/assets/mocks/products.json').pipe(
    map(all => all[profile] ?? [])
  );
}
  //simula investimento
  simulateInvestment(value: number, months: number, type: string, profitability: number) {

  const rateMonthly = Math.pow(1 + profitability, 1/12) - 1;

  const finalValue = value * Math.pow(1 + rateMonthly, months);
  
  const result = {
    finalValue,
    profitability,
    details: `Simulação baseada em ${type} com ${profitability * 100}% ao ano.`
  };


  // salva histórico
  const entry = {
    createdAt: new Date(),
    type,
    value,
    finalValue: result.finalValue,
    months,
    details: result.details
  };

  const history = this.getSimulationHistory();
  history.push(entry);
  localStorage.setItem('simulations', JSON.stringify(history));

  return of(result);
}



  // lista historico
  getSimulationHistory() {
    return JSON.parse(localStorage.getItem('simulations') || '[]');
  }

  clearSimulationHistory() {
    localStorage.removeItem('simulations');
  }
}
