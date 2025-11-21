import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getRecommendedProducts(profile: string) {
    return this.http.get<any>('/assets/mocks/products.json').pipe(
      map(all => all[profile] ?? [])
    );
  }
}
