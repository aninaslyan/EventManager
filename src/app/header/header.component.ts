import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isAuthenticated = false;
  isUserAdmin = false;
  userName: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscribeToUser();
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private subscribeToUser() {
    this.userSubscription = this.authService.user
      .subscribe(user => {
        if (user) {
          this.isAuthenticated = !!user;
          this.userName = `${user.name} ${user.srName}`;

          this.isUserAdmin = this.authService.isAdmin();
        }
      });
  }
}
