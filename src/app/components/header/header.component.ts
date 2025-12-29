import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { filter } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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

  downloadBrochure(): void {
    this.isMobileMenuOpen.set(false);
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = 'brochure.pdf'; // PDF file should be placed in public folder
    link.download = 'Naveen-Nikilesh-Constructions-Brochure.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
