import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  services = [
    {
      icon: 'map',
      title: 'Land Development',
      description: 'Site planning, grading, utilities, and infrastructure development',
      color: '#22C55E' // green
    },
    {
      icon: 'business',
      title: 'Commercial Projects',
      description: 'Office buildings, retail spaces, and commercial complexes',
      color: '#3B82F6' // blue
    },
    {
      icon: 'home',
      title: 'Residential Building',
      description: 'Custom homes, apartments, and residential communities',
      color: '#F59E0B' // amber
    },
    {
      icon: 'design_services',
      title: 'Project Management',
      description: 'Complete project oversight from planning to completion',
      color: '#7C3AED' // violet
    }
  ];

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const options = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, options);

    const cards = this.elementRef.nativeElement.querySelectorAll('.service-card');
    cards.forEach((card: Element) => this.observer?.observe(card));
  }
}
