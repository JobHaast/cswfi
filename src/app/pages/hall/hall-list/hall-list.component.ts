import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  faEdit,
  faBookOpen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Hall } from '../hall.model';
import { HallService } from '../hall.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'client-side-web-frameworks-individual-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.css'],
})
export class HallListComponent implements OnInit, OnDestroy {
  halls$: Observable<Hall[]>;
  faEdit = faEdit;
  faTrash = faTrash;
  faBookOpen = faBookOpen;
  faPlus = faPlus;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  subscription: Subscription;

  constructor(
    private hallService: HallService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.halls$ = this.hallService.getAll();
    this.isLoggedIn$ = this.authService.userIsLoggedIn;
    this.isAdmin$ = this.authService.userIsAdmin;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  deleteHall(id: string): void {
    if (confirm('Are you sure you want to delete this hall?')) {
      this.subscription = this.hallService.deleteHall(id).subscribe(() => {
        this.toastr.success('Successfully deleted the hall');
        this.halls$ = this.hallService.getAll();
      });
    }
  }
}
