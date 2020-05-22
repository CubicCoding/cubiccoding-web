import { Component } from '@angular/core';

import { AuthService } from '@app/auth/auth.service';
import { UserProfile } from './shared/user-profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.authService.userProfile.subscribe(userProfile => this.isUserLoggedIn = userProfile!=null && userProfile.token != null);
  }

  ngOnInit(): void {
    let currentProfile: UserProfile = this.authService.currentUserValue;
    this.isUserLoggedIn = currentProfile != null && currentProfile.token != null;
  }
}
