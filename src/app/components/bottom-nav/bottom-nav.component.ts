import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  route: string;
  link?: string; // optional hash link for in-page navigation
  icon: 'home' | 'about' | 'projects' | 'services' | 'contact';
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {
  @ViewChild('track', { static: true }) trackRef!: ElementRef<HTMLDivElement>;

  items: NavItem[] = [
    { label: 'Home', route: '/', link: '#home', icon: 'home' },
    { label: 'About', route: '/', link: '#about', icon: 'about' },
    { label: 'Projects', route: '/projects', icon: 'projects' },
    { label: 'Services', route: '/', link: '#services', icon: 'services' },
    { label: 'Contact', route: '/', link: '#contact', icon: 'contact' }
  ];

  activeIndex = signal(0);
  isDragging = false;

  constructor(private router: Router) {
    // Sync active index with current route and hash for in-page sections
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const urlPath = this.router.url.split('#')[0];
      if (urlPath === '/projects') {
        const idx = this.items.findIndex(i => i.route === '/projects');
        this.activeIndex.set(idx >= 0 ? idx : this.activeIndex());
      } else if (urlPath === '/') {
        const hash = typeof window !== 'undefined' ? window.location.hash : '';
        if (hash) {
          const idx = this.items.findIndex(i => i.link === hash);
          if (idx >= 0) this.activeIndex.set(idx);
        }
      }
    });
  }

  ngOnInit() {
    const urlPath = this.router.url.split('#')[0];
    if (urlPath === '/projects') {
      const idx = this.items.findIndex(i => i.route === '/projects');
      this.activeIndex.set(idx >= 0 ? idx : 0);
    } else {
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      if (hash) {
        const idx = this.items.findIndex(i => i.link === hash);
        this.activeIndex.set(idx >= 0 ? idx : 0);
      } else {
        // Default to Home
        this.activeIndex.set(0);
      }
    }
  }

  navigateTo(index: number) {
    this.activeIndex.set(index);
    const target = this.items[index];
    // Projects is a dedicated route
    if (target.route === '/projects') {
      this.router.navigate(['/projects']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      return;
    }

    // For hash links, ensure we are on home then scroll to section
    if (target.link && target.link.startsWith('#')) {
      if (this.router.url !== '/') {
        this.router.navigate(['/']).then(() => {
          setTimeout(() => {
            // set hash for better sync
            try {
              if (typeof window !== 'undefined') window.location.hash = target.link!.substring(1);
            } catch {}
            const el = document.querySelector(target.link!);
            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 120);
        });
      } else {
        try {
          if (typeof window !== 'undefined') window.location.hash = target.link.substring(1);
        } catch {}
        const el = document.querySelector(target.link);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Default route navigation
    this.router.navigate([target.route]);
  }

  // Pointer-based slider behavior
  onPointerDown(ev: PointerEvent) {
    this.isDragging = true;
    // Capture on the track to reliably receive move/up events
    this.trackRef?.nativeElement.setPointerCapture?.(ev.pointerId);
    ev.preventDefault();
    this.updateIndexFromEvent(ev);
  }

  onPointerMove(ev: PointerEvent) {
    if (!this.isDragging) return;
    ev.preventDefault();
    this.updateIndexFromEvent(ev);
  }

  onPointerUp(ev: PointerEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    // Release pointer capture
    this.trackRef?.nativeElement.releasePointerCapture?.(ev.pointerId);
    // Navigate to snapped item
    this.navigateTo(this.activeIndex());
  }

  onPointerCancel(ev: PointerEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.trackRef?.nativeElement.releasePointerCapture?.(ev.pointerId);
    // Still navigate to the last snapped item
    this.navigateTo(this.activeIndex());
  }

  private updateIndexFromEvent(ev: PointerEvent) {
    if (!this.trackRef) return;
    const rect = this.trackRef.nativeElement.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const itemWidth = rect.width / this.items.length;
    let idx = Math.floor(x / itemWidth);
    idx = Math.max(0, Math.min(this.items.length - 1, idx));
    this.activeIndex.set(idx);
  }

  @HostListener('window:resize')
  onResize() {
    // No-op: indicator uses percentage positions
  }
}
