import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  navigationItems = [
    { label: 'Home', link: '#home', route: '/' },
    { label: 'About', link: '#about', route: '/' },
    { label: 'Projects', link: '/projects', route: '/projects' },
    { label: 'Services', link: '#services', route: '/' },
    { label: 'Contact', link: '#contact', route: '/' }
  ];

  constructor(
    public themeService: ThemeService,
    private router: Router
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(value => !value);
  }

  navigateTo(item: any): void {
    this.isMobileMenuOpen.set(false);
    
    // If it's the projects page route, navigate
    if (item.route === '/projects') {
      this.router.navigate(['/projects']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } 
    // If it's a hash link and we're not on home page, go home first
    else if (item.link.startsWith('#')) {
      if (this.router.url !== '/') {
        this.router.navigate(['/']).then(() => {
          setTimeout(() => {
            const element = document.querySelector(item.link);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        });
      } else {
        const element = document.querySelector(item.link);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }

  onThemeToggle(): void {
    this.themeService.toggleTheme();
  }
}
