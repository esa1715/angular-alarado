import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

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

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark';
        this.applyTheme();
      } else {
        this.isDarkMode = false;
        this.applyTheme();
        localStorage.setItem('theme', 'light');
      }
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  applyTheme() {
    const logoElement = this.document?.getElementById('logo') as HTMLImageElement | null;
    if (logoElement) {
      if (this.isDarkMode) {
        this.enableDarkMode(logoElement);
      } else {
        this.enableLightMode(logoElement);
      }
    }
  }

  enableDarkMode(logoElement: HTMLImageElement) {
    this.renderer.addClass(this.document.body, 'dark-theme');
    this.renderer.removeClass(this.document.body, 'light-theme');
    logoElement.src = this.logoEscuroPath;
  }

  enableLightMode(logoElement: HTMLImageElement) {
    this.renderer.removeClass(this.document.body, 'dark-theme');
    this.renderer.addClass(this.document.body, 'light-theme');
    logoElement.src = this.logoClaroPath;
  }
}
