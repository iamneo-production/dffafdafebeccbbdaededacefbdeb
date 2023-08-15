import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isOrganizer: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.getUserRole() === 'ADMIN';
    this.isOrganizer = this.authService.getUserRole() === 'ORGANIZER';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
