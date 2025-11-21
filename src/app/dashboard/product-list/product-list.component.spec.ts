import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // provide a fake carousel element after Angular sets ViewChild
    component.carousel = { nativeElement: { clientWidth: 300, scrollTo: jasmine.createSpy('scrollTo'), scrollLeft: 0 } } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculatePages should set cardsPerPage based on width and compute pages', () => {
    (window as any).innerWidth = 500; // between 768 and 1200? actually 500 < 768 -> 1
    component.products = [1,2,3,4];
    component.calculatePages();
    expect(component.cardsPerPage).toBe(1);
    expect(component.pages).toBe(Math.ceil(component.products.length / component.cardsPerPage));

    (window as any).innerWidth = 1000;
    component.calculatePages();
    expect(component.cardsPerPage).toBe(2);

    (window as any).innerWidth = 1400;
    component.calculatePages();
    expect(component.cardsPerPage).toBe(3);
  });

  it('goToPage should call scrollTo and update currentPage', () => {
    const spy = (component.carousel.nativeElement as any).scrollTo as jasmine.Spy;
    component.goToPage(2);
    expect(spy).toHaveBeenCalled();
    expect(component.currentPage).toBe(2);
  });

  it('simulateProduct should emit selected product', () => {
    const emitSpy = spyOn(component.simulate, 'emit');
    const p = '7';
    component.simulateProduct(p as any);
    expect(emitSpy).toHaveBeenCalledWith(p);
  });
});
