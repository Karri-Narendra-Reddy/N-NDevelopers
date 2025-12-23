import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, signal, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private statsObserver?: IntersectionObserver;
  private hasAnimatedStats = false;

  // Animated stat signals
  projectsCompleted = signal(0);
  yearsExperience = signal(0);
  happyClients = signal(0);
  teamMembers = signal(0);
  values = [
    {
      icon: '🎯',
      title: 'Quality First',
      description: 'We never compromise on quality. Every project is executed with precision and attention to detail.'
    },
    {
      icon: '⏱️',
      title: 'Timely Delivery',
      description: 'We respect deadlines and ensure all projects are completed on schedule without delays.'
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'Clear, upfront pricing with no hidden costs. You know exactly what you\'re paying for.'
    },
    {
      icon: '🤝',
      title: 'Client Focus',
      description: 'Your vision is our mission. We work closely with clients to bring their dreams to life.'
    },
    {
      icon: '🏗️',
      title: 'Expert Team',
      description: 'Skilled professionals with years of experience in construction and development.'
    },
    {
      icon: '♻️',
      title: 'Sustainable',
      description: 'Eco-friendly practices and sustainable building methods for a better tomorrow.'
    }
  ];

  team = [
    {
      name: 'Naveen',
      role: 'Co-Founder & Managing Director',
      image: 'https://ui-avatars.com/api/?name=Naveen&size=200&background=6366f1&color=fff',
      description: 'Expert in project management and construction planning'
    },
    {
      name: 'Nikilesh',
      role: 'Co-Founder & Technical Director',
      image: 'https://ui-avatars.com/api/?name=Nikilesh&size=200&background=8b5cf6&color=fff',
      description: 'Specialist in land development and structural design'
    }
  ];

  achievements = [
    { number: '500+', label: 'Projects Completed' },
    { number: '15+', label: 'Years Experience' },
    { number: '1000+', label: 'Happy Clients' },
    { number: '50+', label: 'Expert Team Members' }
  ];

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
    this.setupStatsAnimation();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.statsObserver) {
      this.statsObserver.disconnect();
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

    const cards = this.elementRef.nativeElement.querySelectorAll('.value-card, .mission-card, .vision-card, .team-card, .stat-card');
    cards.forEach((card: Element) => this.observer?.observe(card));
  }

  private setupStatsAnimation(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // Set final values immediately on server
      this.projectsCompleted.set(500);
      this.yearsExperience.set(15);
      this.happyClients.set(1000);
      this.teamMembers.set(50);
      return;
    }

    const options = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    this.statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateCounters();
        } else {
          // Reset counters when leaving viewport
          this.projectsCompleted.set(0);
          this.yearsExperience.set(0);
          this.happyClients.set(0);
          this.teamMembers.set(0);
        }
      });
    }, options);

    const achievementsSection = this.elementRef.nativeElement.querySelector('.achievements-grid');
    if (achievementsSection) {
      this.statsObserver.observe(achievementsSection);
    }
  }

  private animateCounters(): void {
    this.animateValue(this.projectsCompleted, 0, 500, 2000);
    this.animateValue(this.yearsExperience, 0, 15, 2000);
    this.animateValue(this.happyClients, 0, 1000, 2500);
    this.animateValue(this.teamMembers, 0, 50, 2000);
  }

  private animateValue(
    signal: any,
    start: number,
    end: number,
    duration: number
  ): void {
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      signal.set(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }
}
