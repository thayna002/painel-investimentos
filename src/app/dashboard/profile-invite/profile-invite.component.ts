import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-invite',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './profile-invite.component.html',
  styleUrl: './profile-invite.component.scss',
})
export class ProfileInviteComponent {

  constructor(private router: Router) {}

  goToQuiz() {
    this.router.navigate(['/quiz']);
  }
}
