import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/pages/user/user.model';

@Component({
  selector: 'client-side-web-frameworks-individual-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() title;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isUser$: Observable<boolean>;
  fullNameSubscription: Subscription;
  userSubscription: Subscription;
  fullName = '';
  isNavbarCollapsed = true;
  user: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.userIsLoggedIn;
    this.isAdmin$ = this.authService.userIsAdmin;
    this.isUser$ = this.authService.userIsPlain;
    this.fullNameSubscription = this.authService.userEmail.subscribe(
      (name) => (this.fullName = name)
    );
    this.userSubscription = this.authService
      .getCurrentUser()
      .subscribe((user) => (this.user = user));
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.fullNameSubscription?.unsubscribe();
  }
}
