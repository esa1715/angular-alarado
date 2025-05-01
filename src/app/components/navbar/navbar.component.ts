import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

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
  @Inject(DOCUMENT) private document: Document
) { }

ngOnInit(): void {
  if (this.document) {
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
  if (this.document) {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }
}

applyTheme() {
  const logoElement = this.document ? this.document.getElementById('logo') as HTMLImageElement | null : null;
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