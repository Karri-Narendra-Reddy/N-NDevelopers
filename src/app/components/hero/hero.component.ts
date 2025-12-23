import { Component, OnInit, AfterViewInit, ElementRef, signal, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit {
  isVisible = signal(false);
  projectCount = signal(0);
  satisfactionRate = signal(0);
  yearsExperience = signal(0);
  private hasAnimated = false;

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.isVisible.set(true), 100);
  }

  ngAfterViewInit(): void {
    this.setupStatsAnimation();
  }

  private setupStatsAnimation(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // Set final values immediately on server
      this.projectCount.set(500);
      this.satisfactionRate.set(98);
      this.yearsExperience.set(25);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounters();
          } else {
            // Reset counters when leaving viewport
            this.projectCount.set(0);
            this.satisfactionRate.set(0);
            this.yearsExperience.set(0);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = this.elementRef.nativeElement.querySelector('.hero-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  private animateCounters(): void {
    this.animateValue(this.projectCount, 0, 500, 2000);
    this.animateValue(this.satisfactionRate, 0, 98, 2000);
    this.animateValue(this.yearsExperience, 0, 25, 2000);
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

  navigateToSection(sectionId: string): void {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
