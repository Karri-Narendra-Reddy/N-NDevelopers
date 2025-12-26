import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, signal, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  values = [
    {
      icon: 'track_changes',
      title: 'Quality First',
      description: 'We never compromise on quality. Every project is executed with precision and attention to detail.',
      color: '#7C3AED' // violet
    },
    {
      icon: 'schedule',
      title: 'Timely Delivery',
      description: 'We respect deadlines and ensure all projects are completed on schedule without delays.',
      color: '#06B6D4' // cyan
    },
    {
      icon: 'groups',
      title: 'Client Focus',
      description: 'Your vision is our mission. We work closely with clients to bring their dreams to life.',
      color: '#22C55E' // green
    },
    {
      icon: 'engineering',
      title: 'Expert Team',
      description: 'Skilled professionals with years of experience in construction and development.',
      color: '#F59E0B' // amber
    }
  ];

  amenities = [
    {
      icon: 'route',
      title: '40 Feet CC Roads',
      description: 'Wide concrete roads for smooth and safe transportation',
      color: '#6366f1' // indigo
    },
    {
      icon: 'park',
      title: 'Avenue Plantation',
      description: 'Lush green tree-lined avenues for a refreshing environment',
      color: '#22C55E' // green
    },
    {
      icon: 'self_improvement',
      title: 'Outdoor Yoga',
      description: 'Dedicated space for yoga and meditation in nature',
      color: '#7C3AED' // violet
    },
    {
      icon: 'child_care',
      title: 'Kids Play Area',
      description: 'Safe and fun play zone for children with modern equipment',
      color: '#F59E0B' // amber
    },
    {
      icon: 'directions_walk',
      title: '500 Mts Walking Track',
      description: 'Well-maintained walking track for fitness enthusiasts',
      color: '#06B6D4' // cyan
    },
    {
      icon: 'filter_vintage',
      title: '100% Vaastu',
      description: 'All plots designed according to Vastu Shastra principles',
      color: '#EC4899' // pink
    },
    {
      icon: 'videocam',
      title: '24/7 CCTV Surveillance',
      description: 'Round-the-clock security monitoring for your safety',
      color: '#EF4444' // red
    },
    {
      icon: 'fence',
      title: 'Compound Walls',
      description: 'Fully secured with compound walls for complete protection',
      color: '#8B5CF6' // purple
    }
  ];

  // Removed achievements array as it's replaced by amenities

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
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop observing once animated to prevent re-animation
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    // Use setTimeout to defer observation until next frame
    setTimeout(() => {
      const cards = this.elementRef.nativeElement.querySelectorAll('.value-card, .mission-card, .vision-card, .amenity-card');
      cards.forEach((card: Element) => this.observer?.observe(card));
    }, 100);
  }
}
