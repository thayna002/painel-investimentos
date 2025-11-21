import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements AfterViewInit {

  @Input() products: any[] = [];
  @Output() simulate = new EventEmitter<string>();

  @ViewChild('carousel') carousel!: ElementRef;

  pages = 1;
  currentPage = 0;
  cardsPerPage = 1;

  ngAfterViewInit() {
    setTimeout(() => this.calculatePages(), 50);
  }

  @HostListener('window:resize')
  onResize() {
    this.calculatePages();
  }

  calculatePages() {
    const width = window.innerWidth;

    if (width < 768) {
      this.cardsPerPage = 1;
    } else if (width < 1200) {
      this.cardsPerPage = 2;
    } else {
      this.cardsPerPage = 3;
    }

    this.pages = Math.ceil(this.products.length / this.cardsPerPage);

    if (this.currentPage >= this.pages) {
      this.currentPage = 0;
    }

    this.goToPage(this.currentPage);
  }

  goToPage(page: number) {
    const container = this.carousel.nativeElement;

    container.scrollTo({
      left: page * container.clientWidth,
      behavior: 'smooth'
    });

    this.currentPage = page;
  }

  onScroll() {
    const container = this.carousel.nativeElement;
    this.currentPage = Math.round(
      container.scrollLeft / container.clientWidth
    );
  }

  simulateProduct(product: any) {
    this.simulate.emit(product);
}

}
