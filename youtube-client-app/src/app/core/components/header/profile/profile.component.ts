import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonButtonComponent, NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    protected auth: AuthService,
    private router: Router
  ) {}

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}
