import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal(false);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Check for saved theme preference or default to light mode
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode.set(savedTheme === 'dark');
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);
      }

      // Apply theme on initialization
      effect(() => {
        this.applyTheme(this.isDarkMode());
      });
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(value => !value);
  }

  private applyTheme(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      const theme = isDark ? 'dark' : 'light';
      document.body.setAttribute('data-theme', theme);
      document.body.style.colorScheme = theme;
      localStorage.setItem('theme', theme);
    }
  }
}
