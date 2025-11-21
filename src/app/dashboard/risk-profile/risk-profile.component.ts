import { Component, Input } from '@angular/core';
import { ProfileModel } from '../../models/profile.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-risk-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-profile.component.html',
  styleUrls: ['./risk-profile.component.scss'],
})
export class RiskProfileComponent {

  @Input() profile: ProfileModel | null = null;

}
