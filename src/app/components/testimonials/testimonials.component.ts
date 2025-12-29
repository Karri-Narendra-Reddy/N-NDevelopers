import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

type Testimonial = {
  name: string;
  role: string;
  company?: string;
  rating: number; // 1-5
  quote: string;
  videoUrl?: string; // YouTube embed URL
};

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, MatIconModule, SafeUrlPipe],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('track') trackRef?: ElementRef<HTMLDivElement>;
  private resizeObs?: ResizeObserver;

  testimonials: Testimonial[] = [
    {
      name: 'Srinivas Reddy',
      role: 'Homeowner',
      company: 'Private Client',
      rating: 5,
      quote:
        'Exceptional workmanship and transparent communication throughout. The team delivered on time with premium quality.',
      videoUrl: 'https://www.youtube.com/embed/ugzfxhtz5H8?si=Za8RlKyiWOFaNdBO' // Replace with actual YouTube embed URL
    },
    {
      name: 'Narendra Reddy',
      role: 'Entrepreneur',
      company: 'Retail Fitout',
      rating: 5,
      quote:
        'They transformed our space beautifully. Professional, detail‑oriented, and incredibly reliable from start to finish.',
      videoUrl: 'https://www.youtube.com/embed/ugzfxhtz5H8?si=Za8RlKyiWOFaNdBO' // Replace with actual YouTube embed URL
    },
    {
      name: 'Sai Venkata Srinivasa Reddy',
      role: 'Developer',
      company: 'Land Development',
      rating: 4,
      quote:
        'Strong planning and execution. Permits, layouts, and delivery were handled smoothly with minimal friction.',
      videoUrl: 'https://www.youtube.com/embed/ugzfxhtz5H8?si=Za8RlKyiWOFaNdBO' // Replace with actual YouTube embed URL
    },
    {
      name: 'Santhosh G',
      role: 'Architect',
      company: 'Design Partner',
      rating: 5,
      quote:
        'A great partner to collaborate with—quality craftsmanship, clear specs adherence, and responsive site management.',
      videoUrl: 'https://www.youtube.com/embed/ugzfxhtz5H8?si=Za8RlKyiWOFaNdBO' // Replace with actual YouTube embed URL
    }
  ];

  stars(count: number): number[] {
    return Array.from({ length: Math.max(0, Math.min(5, count)) }, (_, i) => i);
  }

  currentIndex = signal(0);
  slidesPerView = signal(1);

  hue(seed: string): number {
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
      h = (h * 31 + seed.charCodeAt(i)) % 360;
    }
    return h;
  }

  ngAfterViewInit(): void {
    this.updateSlidesPerView();
    this.resizeObs = new ResizeObserver(() => this.updateSlidesPerView());
    this.resizeObs.observe(document.body);
  }

  ngOnDestroy(): void {
    this.resizeObs?.disconnect();
  }

  get maxIndex(): number {
    return Math.max(0, this.testimonials.length - this.slidesPerView());
  }

  prev(): void {
    this.scrollToIndex(this.currentIndex() - 1);
  }

  next(): void {
    this.scrollToIndex(this.currentIndex() + 1);
  }

  goTo(i: number): void {
    this.scrollToIndex(i);
  }

  onScroll(): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    if (!children.length) return;
    const left = track.scrollLeft;
    let closest = 0;
    let minDelta = Number.POSITIVE_INFINITY;
    children.forEach((el, idx) => {
      const delta = Math.abs(el.offsetLeft - left);
      if (delta < minDelta) {
        minDelta = delta;
        closest = idx;
      }
    });
    this.currentIndex.set(Math.min(closest, this.maxIndex));
  }

  private scrollToIndex(i: number): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;
    const clamped = Math.max(0, Math.min(this.maxIndex, i));
    const target = track.children[clamped] as HTMLElement | undefined;
    if (!target) return;
    track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    this.currentIndex.set(clamped);
  }

  private updateSlidesPerView(): void {
    // Always show 1 card at a time regardless of screen size
    this.slidesPerView.set(1);
    // Clamp current index if needed
    this.currentIndex.set(Math.min(this.currentIndex(), this.maxIndex));
  }

  pages(): number[] {
    const total = Math.max(1, this.maxIndex + 1);
    return Array.from({ length: total }, (_, i) => i);
  }

  updateMouse(e: MouseEvent): void {
    const card = (e.target as HTMLElement)?.closest('.card') as HTMLElement | null;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    card.style.setProperty('--mx', `${x}%`);
  }

  resetMouse(): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;
    Array.from(track.querySelectorAll('.card')).forEach((el) =>
      (el as HTMLElement).style.setProperty('--mx', '50%')
    );
  }
}
