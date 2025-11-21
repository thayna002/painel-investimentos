import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  menuOpen = false;

  constructor(private auth: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.auth.logout();
    this.menuOpen = false;
    this.router.navigate(['/login']);
  }
}
