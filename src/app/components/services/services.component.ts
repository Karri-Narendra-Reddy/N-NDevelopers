import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  services = [
    {
      icon: '🏗️',
      title: 'General Construction',
      description: 'Complete building construction services from foundation to finishing'
    },
    {
      icon: '🏘️',
      title: 'Land Development',
      description: 'Site planning, grading, utilities, and infrastructure development'
    },
    {
      icon: '🏢',
      title: 'Commercial Projects',
      description: 'Office buildings, retail spaces, and commercial complexes'
    },
    {
      icon: '🏡',
      title: 'Residential Building',
      description: 'Custom homes, apartments, and residential communities'
    },
    {
      icon: '🔧',
      title: 'Renovation & Remodeling',
      description: 'Interior and exterior renovations for all property types'
    },
    {
      icon: '📐',
      title: 'Project Management',
      description: 'Complete project oversight from planning to completion'
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
