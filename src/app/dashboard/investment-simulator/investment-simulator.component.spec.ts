import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InvestmentSimulatorComponent } from './investment-simulator.component';

describe('InvestmentSimulatorComponent', () => {
  let component: InvestmentSimulatorComponent;
  let fixture: ComponentFixture<InvestmentSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentSimulatorComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges should patch form and set rate', () => {
    const prod = { type: 'CDB', profitability: 0.12, name: 'X' };
    component.product = prod;
    component.ngOnChanges({ product: { currentValue: prod, previousValue: null, firstChange: true, isFirstChange: () => true } as any });
    expect(component.rate).toBe(prod.profitability);
    // type control is disabled but should be patched
    expect(component.simulationForm.getRawValue().type).toBe(prod.type);
  });

  it('simulate should compute result and persist history', () => {
    localStorage.removeItem('simulations');
    const prod = { type: 'CDB', profitability: 0.12, name: 'X' };
    component.product = prod;
    component.ngOnChanges({ product: { currentValue: prod, previousValue: null, firstChange: true, isFirstChange: () => true } as any });

    component.simulationForm.patchValue({ value: 1000, months: 12 });
    // ensure valid
    expect(component.simulationForm.valid).toBeTrue();

    component.simulate();
    expect(component.result).toBeTruthy();
    const history = JSON.parse(localStorage.getItem('simulations') || '[]');
    expect(history.length).toBeGreaterThan(0);
    // cleanup
    localStorage.removeItem('simulations');
  });

  it('clearHistory should clear simulations', () => {
    localStorage.setItem('simulations', JSON.stringify([1]));
    component.clearHistory();
    expect(component.history.length).toBe(0);
    expect(localStorage.getItem('simulations')).toBeNull();
  });
});
