import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InvestmentChartComponent } from './investment-chart.component';

describe('InvestmentChartComponent', () => {
  let component: InvestmentChartComponent;
  let fixture: ComponentFixture<InvestmentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentChartComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
