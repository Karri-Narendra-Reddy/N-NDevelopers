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
  private statsObserver?: IntersectionObserver;
  private hasAnimatedStats = false;

  // Animated stat signals
  projectsCompleted = signal(0);
  yearsExperience = signal(0);
  happyClients = signal(0);
  teamMembers = signal(0);
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
    { number: '25+', label: 'Projects Completed' },
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
      const cards = this.elementRef.nativeElement.querySelectorAll('.value-card, .mission-card, .vision-card, .team-card, .stat-card');
      cards.forEach((card: Element) => this.observer?.observe(card));
    }, 100);
  }

  private setupStatsAnimation(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // Set final values immediately on server
      this.projectsCompleted.set(25);
      this.yearsExperience.set(15);
      this.happyClients.set(1000);
      this.teamMembers.set(50);
      return;
    }

    const options = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    this.statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimatedStats) {
          this.hasAnimatedStats = true;
          this.animateCounters();
          // Stop observing once animated
          this.statsObserver?.unobserve(entry.target);
        }
      });
    }, options);

    setTimeout(() => {
      const achievementsSection = this.elementRef.nativeElement.querySelector('.achievements-grid');
      if (achievementsSection && this.statsObserver) {
        this.statsObserver.observe(achievementsSection);
      }
    }, 100);
  }

  private animateCounters(): void {
    this.animateValue(this.projectsCompleted, 0, 25, 2000);
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
      const easeOutQuart = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      signal.set(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure final value is set
        signal.set(end);
      }
    };
    requestAnimationFrame(step);
  }
}
