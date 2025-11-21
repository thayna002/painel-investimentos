import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InvestmentService } from './investment.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('InvestmentService', () => {
  let service: InvestmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(InvestmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRecommendedProducts should fetch by profile', (done) => {
    const mock = {
      'Conservador': [{ id: 1, name: 'Produto A' }]
    };

    service.getRecommendedProducts('Conservador').subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].name).toBe('Produto A');
      done();
    });

    const req = httpMock.expectOne('/assets/mocks/products.json');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('getInvestments should fetch investments by clientId', (done) => {
    const mock = { '123': [{ id: 5, value: 1000 }] };

    service.getInvestments(123).subscribe(res => {
      expect(Array.isArray(res)).toBeTrue();
      expect(res[0].id).toBe(5);
      done();
    });

    const req = httpMock.expectOne('/assets/mocks/investments.json');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('simulateInvestment should compute final value and persist history', (done) => {
    localStorage.removeItem('simulations');

    service.simulateInvestment(1000, 12, 'CDB', 0.12).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.finalValue).toBeGreaterThan(1000);

      const history = JSON.parse(localStorage.getItem('simulations') || '[]');
      expect(history.length).toBeGreaterThan(0);
      expect(history[0].type).toBe('CDB');
      done();
    });
  });

  it('getSimulationHistory and clearSimulationHistory should work', () => {
    localStorage.setItem('simulations', JSON.stringify([{ foo: 'bar' }]));
    const h = service.getSimulationHistory();
    expect(h.length).toBe(1);
    service.clearSimulationHistory();
    expect(localStorage.getItem('simulations')).toBeNull();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('simulations');
  });
});
