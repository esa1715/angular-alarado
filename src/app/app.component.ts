import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HeroComponent } from "./components/hero/hero.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, HeroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'alarado';
}
