import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../user/user.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
})
export class PeopleListComponent implements OnInit, OnDestroy {
  suggestions$: Observable<User[]>;
  friendsOfFriends$: Observable<User[]>;
  currentUser: User;
  subscription: Subscription;

  constructor(
    private peopleService: PeopleService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      this.suggestions$ = this.peopleService.getAll(this.currentUser._id);
      this.friendsOfFriends$ = this.peopleService.getFriendsOfFriends(
        this.currentUser._id
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addFriend(id: string) {
    this.peopleService.addFriend(this.currentUser._id, id).subscribe(() => {
      this.toastr.success('You are now following the selected person');
      this.suggestions$ = this.peopleService.getAll(this.currentUser._id);
      this.friendsOfFriends$ = this.peopleService.getFriendsOfFriends(
        this.currentUser._id
      );
    });
  }
}
