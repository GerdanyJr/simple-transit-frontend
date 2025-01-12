import { Component, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aside-bar',
  imports: [
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './aside-bar.component.html',
  styleUrl: './aside-bar.component.scss'
})
export class AsideBarComponent implements OnInit, OnDestroy {
  private _userSubscription!: Subscription;
  isAuthenticated = signal(false);
  @ViewChild("drawer") drawer!: MatDrawer;

  NAVOPTIONS = [
    {
      text: "Dashboard",
      icon: "assessment",
      redirect: "/",
      protected: false
    },
    {
      text: "Ocorrências",
      icon: "report",
      redirect: "/reports",
      protected: false,
    },
    {
      text: "Criar Ocorrência",
      icon: "add",
      redirect: "/reports/create",
      protected: true
    },
    {
      text: "Usuário",
      icon: "person",
      redirect: "/user",
      protected: true
    },
  ];

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

  toggle() {
    this.drawer.toggle();
  }
}
