import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AsideBarComponent } from "../../components/aside-bar/aside-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    AsideBarComponent,
    RouterOutlet
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {
  @ViewChild(AsideBarComponent) drawer!: AsideBarComponent;

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


  toggleDrawer() {
    this.drawer.toggle();
  }
}
