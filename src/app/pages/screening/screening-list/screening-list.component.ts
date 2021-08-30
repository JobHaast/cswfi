import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Screening } from '../screening.model';
import { ScreeningService } from '../screening.service';
import {
  faBookOpen,
  faPlus,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'client-side-web-frameworks-individual-screening-list',
  templateUrl: './screening-list.component.html',
  styleUrls: ['./screening-list.component.css'],
})
export class ScreeningListComponent implements OnInit, OnDestroy {
  screenings$: Observable<Screening[]>;
  subscription: Subscription;
  faEdit = faEdit;
  faTrash = faTrash;
  faBookOpen = faBookOpen;
  faPlus = faPlus;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(
    private screeningService: ScreeningService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.screenings$ = this.screeningService.getAll();
    this.isLoggedIn$ = this.authService.userIsLoggedIn;
    this.isAdmin$ = this.authService.userIsAdmin;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  deleteScreening(id: string): void {
    if (confirm('Are you sure you want to delete this screening?')) {
      this.subscription = this.screeningService
        .deleteScreening(id)
        .subscribe(() => {
          this.toastr.success('Succesfully deleted the screening');
          this.screenings$ = this.screeningService.getAll();
        });
    }
  }
}
