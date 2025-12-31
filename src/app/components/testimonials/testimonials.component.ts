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
      name: 'K Venkanna',
      role: 'Farmer',
      company: 'Self Employed',
      rating: 5,
      quote:
        'This is a DTCP approved layout with all necessary amenities. The team was very supportive from site visit to registration. The plot location is excellent with good road connectivity and surrounded by developed layouts. Overall, a great investment opportunity.',
      image: '',
      videoUrl: 'https://www.youtube.com/embed/ugzfxhtz5H8?si=Za8RlKyiWOFaNdBO' // Replace with actual YouTube embed URL
    },
    {
      name: 'M Ramachandra Reddy',
      role: 'Government Employee',
      company: 'Retired',
      rating: 4,
      quote:
        'After my retirement, I wanted to invest in a peaceful and well-developed layout. This project offered the perfect blend of tranquility and modern amenities. The team was very professional and guided me through the entire process smoothly.',
      image: '',
      videoUrl: 'https://www.youtube.com/embed/ugzfxhtz5H8?si=Za8RlKyiWOFaNdBO' // Replace with actual YouTube embed URL
    },
    {
      name: 'K Suresh Babu',
      role: 'Family-Oriented Decision',
      company: 'Private Client',
      rating: 5,
      quote:
        'We wanted a peaceful environment away from the city hustle. This layout offered just that with its serene surroundings and essential amenities. The team was very helpful and guided us through every step, making the entire process hassle-free.',
      image: '',
      videoUrl: 'https://www.youtube.com/embed/ugzfxhtz5H8?si=Za8RlKyiWOFaNdBO' // Replace with actual YouTube embed URL
    },
    {
      name: 'B Harish Kumar',
      role: 'Contractor',
      company: 'Construction Partner',
      rating: 5,
      quote:
        'I have worked on this project as a contractor and can vouch for the quality of development and infrastructure. The layout is well-planned with all necessary amenities, making it an ideal choice for investors and end-users alike.',
      image: '',
      videoUrl: 'https://www.youtube.com/embed/ugzfxhtz5H8?si=Za8RlKyiWOFaNdBO'
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
    initials(name: string): string {
      if (!name) return '?';
      const parts = name.trim().split(/\s+/).filter(Boolean);
      const first = parts[0]?.[0] ?? '';
      const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
      const out = `${first}${last}`.toUpperCase();
      return out || '?';
    }

}
