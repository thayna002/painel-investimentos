import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { ProfileService } from '../services/profile.service';
import { InvestmentService } from '../services/investment.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const mockProfileService = {
    getProfile: (id: number) => of(null)
  } as Partial<ProfileService> as ProfileService;

  const mockInvestmentService = {
    getRecommendedProducts: (profile: string) => of([]),
    getSimulationHistory: () => [],
    clearSimulationHistory: () => {},
    getInvestments: (clientId: number) => of([])
  } as Partial<InvestmentService> as InvestmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, HttpClientTestingModule],
      providers: [
        { provide: ProfileService, useValue: mockProfileService },
        { provide: InvestmentService, useValue: mockInvestmentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // services are provided via TestBed providers
    (component as any).profileService = TestBed.inject(ProfileService);
    (component as any).investmentService = TestBed.inject(InvestmentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadProfile does nothing when no clientId', () => {
    localStorage.removeItem('clientId');
    component.profile = null;
    component.products = [1,2];
    component.loadProfile();
    expect(component.profile).toBeNull();
    expect(component.products.length).toBe(2);
  });

  it('loadProfile loads profile and products when clientId set', (done) => {
    localStorage.setItem('clientId', '7');
    const profile = { profile: 'Conservador' };
    const products = [{ id: 1 }];

    // replace mocks to return values
    (component as any).profileService = { getProfile: () => of(profile) };
    (component as any).investmentService = { getRecommendedProducts: () => of(products) };

    component.loadProfile();

    // allow async subscriptions to run
    setTimeout(() => {
      expect(component.profile).toEqual(profile);
      expect(component.products).toEqual(products);
      localStorage.removeItem('clientId');
      done();
    }, 10);
  });

  it('onSimulate sets selectedProduct and scrolls simulator into view', () => {
    const el = document.createElement('div');
    el.id = 'simulator-card';
    el.scrollIntoView = jasmine.createSpy('scrollIntoView');
    document.body.appendChild(el);

    const p = { id: 99 };
    component.onSimulate(p);
    expect(component.selectedProduct).toBe(p);
    expect((el.scrollIntoView as jasmine.Spy).calls.count()).toBe(1);

    document.body.removeChild(el);
  });
});
