import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBookOpen,
  faEdit,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'client-side-web-frameworks-individual-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  subscription: Subscription;
  faTrash = faTrash;
  faEdit = faEdit;
  faBookOpen = faBookOpen;
  faPlus = faPlus;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('User-list loaded');
    this.users$ = this.userService.getAll();
    console.log(this.users$);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.subscription = this.userService.deleteUser(id).subscribe(() => {
        this.toastr.success('Succesfully deleted user');
        this.users$ = this.userService.getAll();
      });
    }
  }
}
