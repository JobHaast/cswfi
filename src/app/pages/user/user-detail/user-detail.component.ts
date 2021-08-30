import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { PeopleService } from '../../people/people.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'client-side-web-frameworks-individual-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User>;
  currentUser: User;
  subscription: Subscription;
  following$: Observable<User[]>;
  isOwner: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService
      .getCurrentUser()
      .subscribe((user) => (this.currentUser = user));
    this.following$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.peopleService.getFriends(params.get('id'))
      )
    );
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.isOwner = params.get('id') === this.currentUser?._id;
        return this.userService.getById(params.get('id'));
      })
    );
  }

  removeFollow(id: string): void {
    this.peopleService.removeFriend(this.currentUser._id, id).subscribe(() => {
      this.following$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.peopleService.getFriends(params.get('id'))
        )
      );
      this.toastr.success('Unfollowed the selected person');
    });
  }

  removeFilm(id: string): void {
    this.userService.removeFilm(id, this.currentUser._id).subscribe(() => {
      this.toastr.success('Successfully removed the film from your list');
      this.user$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.userService.getById(params.get('id'))
        )
      );
    });
  }
}
