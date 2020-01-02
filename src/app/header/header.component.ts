import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  userName: string;

  constructor(private authService: AuthService) {
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.user = this.authService.user.value;
      this.userName = `${this.user.name} ${this.user.srName}`;
    }
  }
}
