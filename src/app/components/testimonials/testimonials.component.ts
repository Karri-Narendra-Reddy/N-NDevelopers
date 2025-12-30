import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
// Removed SafeUrlPipe and DomSanitizer as video embed is commented out

type Testimonial = {
  name: string;
  role: string;
  company?: string;
  rating: number; // 1-5
  quote: string;
  videoUrl?: string; // YouTube embed URL
  image?: string; // left-side photo
};

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('track') trackRef?: ElementRef<HTMLDivElement>;
  private resizeObs?: ResizeObserver;

  testimonials: Testimonial[] = [
    {
      name: 'K Narendra Reddy',
      role: 'IT Employee',
      company: 'Private Client',
      rating: 5,
      quote:
        'As an IT employee buying for the first time, the team made weekend site visits effortless and explained the master plan and approvals clearly. Plot dimensions and directions were aligned to vastu, registration happened on time, and overall customer service was responsive and transparent.',
      image: 'https://naveenandnikilesh.blob.core.windows.net/images/Testimonials/Narendra.jpg',
      videoUrl: 'https://www.youtube.com/embed/ugzfxhtz5H8?si=Za8RlKyiWOFaNdBO' // Replace with actual YouTube embed URL
    },
    {
      name: 'M S V S Reddy',
      role: 'IT Employee',
      company: 'Private Client',
      rating: 4,
      quote:
        'We invested after a thorough site visit—corner markings were precise, options for NE‑facing plots were available, and the layout planning inspired confidence. Pricing was fair with no hidden charges, and the process from booking to registration was professional and hassle‑free.',
      image: 'https://naveenandnikilesh.blob.core.windows.net/images/Testimonials/Sai.JPG',
      videoUrl: 'https://www.youtube.com/embed/ugzfxhtz5H8?si=Za8RlKyiWOFaNdBO' // Replace with actual YouTube embed URL
    },
    {
      name: 'G Santosh',
      role: 'IT Employee',
      company: 'Private Client',
      rating: 5,
      quote:
        'Happy with the township amenities—parks, street lighting, and wide roads—and the adherence to vastu across the layout. The team was prompt, supportive during documentation, and the registration experience was seamless. Highly recommended to fellow buyers in our village.',
      image: 'https://naveenandnikilesh.blob.core.windows.net/images/Testimonials/santosh.jfif',
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
