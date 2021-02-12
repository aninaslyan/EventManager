import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/Operators';

import { AuthService } from '../../auth/auth.service';
import { WithDestroy } from '@shared/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends WithDestroy() implements OnInit {
  isAuthenticated = false;
  isUserAdmin = false;
  userName: string;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.subscribeToUser();
  }

  public onLogOut() {
    this.authService.logOut();
  }

  private subscribeToUser() {
    this.authService.user
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.isAuthenticated = !!user;
          this.userName = `${user.name} ${user.srName}`;

          this.isUserAdmin = this.authService.isAdmin();
        }
      });
  }
}
