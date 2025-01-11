import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-aside-bar',
  imports: [
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './aside-bar.component.html',
  styleUrl: './aside-bar.component.scss'
})
export class AsideBarComponent {
  @ViewChild("drawer") drawer!: MatDrawer;
  
  NAVOPTIONS = [
    {
      text: "Dashboard",
      icon: "assessment",
      redirect: "/"
    },
    {
      text: "Ocorrências",
      icon: "report",
      redirect: "/reports"
    },
    {
      text: "Usuário",
      icon: "person",
      redirect: "/user"
    },
  ];

  toggle() {
    this.drawer.toggle();
  }
}
