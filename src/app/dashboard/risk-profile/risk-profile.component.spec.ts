import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RiskProfileComponent } from './risk-profile.component';

describe('RiskProfileComponent', () => {
  let component: RiskProfileComponent;
  let fixture: ComponentFixture<RiskProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskProfileComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
