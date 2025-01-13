import { Component, OnDestroy, OnInit, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuClick = output();
  isAuthenticated = signal(false);
  private _userSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this._userSubscription = this
      .authService
      .user
      .subscribe(value => this.isAuthenticated.set(!!value));
  }

  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }

  onMenuClick() {
    this.menuClick.emit();
  }

  logout() {
    this.authService.logout();
  }

}
