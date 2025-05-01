import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isDarkMode: boolean = false;
  logoClaroPath: string = '/assets/navbar/logo-light.svg';
  logoEscuroPath: string = '/assets/navbar/logo-dark.svg';

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  applyTheme() {
    const logoElement = document.getElementById('logo') as HTMLImageElement | null;
    if (logoElement) {
      if (this.isDarkMode) {
        this.enableDarkMode(logoElement);
      } else {
        this.enableLightMode(logoElement);
      }
    }
  }

  enableDarkMode(logoElement: HTMLImageElement) {
    this.renderer.addClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
    logoElement.src = this.logoEscuroPath;
  }

  enableLightMode(logoElement: HTMLImageElement) {
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.addClass(document.body, 'light-theme');
    logoElement.src = this.logoClaroPath;
  }
}