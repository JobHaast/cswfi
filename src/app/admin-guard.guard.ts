import { Location } from '@angular/common';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardGuard implements CanActivate, OnDestroy {
  isLoggedIn: boolean;
  isAdmin: boolean;
  sub1: Subscription;
  sub2: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.sub1 = authService.userIsAdmin.subscribe(
      (value) => (this.isAdmin = value)
    );
    this.sub2 = authService.isLoggedInUser.subscribe(
      (value) => (this.isLoggedIn = value)
    );
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isLoggedIn && this.isAdmin) {
      return true;
    }
    this.router.navigateByUrl('/dashboard');
    this.toastr.error('You do not have permission to enter this page');
    return false;
  }
}
