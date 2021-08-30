import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActorService } from '../actor.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { Actor } from '../actor.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'client-side-web-frameworks-individual-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css'],
})
export class ActorListComponent implements OnInit, OnDestroy {
  actors$: Observable<Actor[]>;
  faPlus = faPlus;
  subscription: Subscription;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(
    private actorService: ActorService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.actors$ = this.actorService.getAll();
    this.isLoggedIn$ = this.authService.userIsLoggedIn;
    this.isAdmin$ = this.authService.userIsAdmin;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.isLoggedIn$ = this.authService.userIsLoggedIn;
    this.isAdmin$ = this.authService.userIsAdmin;
  }

  deleteActor(id: string): void {
    if (confirm('Are you sure you want to delete this actor?')) {
      this.subscription = this.actorService.deleteActor(id).subscribe(() => {
        this.toastr.success('Successfully deleted the actor');
        this.actors$ = this.actorService.getAll();
      });
    }
  }
}
