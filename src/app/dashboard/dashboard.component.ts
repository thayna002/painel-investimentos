import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { InvestmentService } from "../services/investment.service";
import { ProfileService } from "../services/profile.service";
import { FooterComponent } from "../shared/footer/footer.component";
import { HeaderComponent } from "../shared/header/header.component";
import { InvestmentChartComponent } from "./investment-chart/investment-chart.component";
import { InvestmentSimulatorComponent } from "./investment-simulator/investment-simulator.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { RiskProfileComponent } from "./risk-profile/risk-profile.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    RiskProfileComponent,
    ProductListComponent,
    InvestmentSimulatorComponent,
    InvestmentChartComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {

  profile: any = null;
  products: any[] = [];
  selectedProduct: any = null;


  constructor(
    private profileService: ProfileService,
    private investmentService: InvestmentService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const clientId = Number(localStorage.getItem("clientId"));

    if (!clientId) {
      return;
    }

    this.profileService.getProfile(clientId).subscribe(profile => {
      this.profile = profile;

      if (!profile) {
        console.warn("Nenhum perfil encontrado para esse clientId.");
        this.products = [];
        return;
      }

      this.investmentService
        .getRecommendedProducts(profile.profile)
        .subscribe(p => {
          this.products = p ?? [];
        });
    });
  }

 onSimulate(product: any) {
  this.selectedProduct = product;

  const simulator = document.getElementById('simulator-card');
  simulator?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

}
