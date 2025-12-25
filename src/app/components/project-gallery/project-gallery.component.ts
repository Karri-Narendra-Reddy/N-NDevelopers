import { Component, Input, Output, EventEmitter, signal, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  gallery: string[];
  location?: string;
  year?: string;
  client?: string;
}

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.scss'],
  animations: [
    trigger('modalAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(100%) scaleY(0.1) scaleX(0.5)',
        transformOrigin: 'center bottom'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0) scaleY(1) scaleX(1)',
        transformOrigin: 'center bottom'
      })),
      transition('void => *', [
        animate('600ms cubic-bezier(0.17, 0.67, 0.12, 1.53)')
      ]),
      transition('* => void', [
        animate('400ms cubic-bezier(0.7, 0, 0.84, 0)', 
          style({
            opacity: 0,
            transform: 'translateY(100%) scaleY(0.1) scaleX(0.5)',
            transformOrigin: 'center bottom'
          })
        )
      ])
    ]),
    trigger('backdropAnimation', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void => *', [
        animate('450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ]),
      transition('* => void', [
        animate('350ms cubic-bezier(0.55, 0.055, 0.675, 0.19)')
      ])
    ])
  ]
})
export class ProjectGalleryComponent {
  @Input() project: Project | null = null;
  @Input() origin: { x: number, y: number } | null = null;
  @Output() close = new EventEmitter<void>();
  
  currentImageIndex = signal<number>(0);
  isZoomed = signal<boolean>(false);
  isFullscreen = signal<boolean>(false);
  showInfo = signal<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getAnimationOrigin(): string {
    if (!this.origin) {
      return '50% 50%';
    }
    return `${this.origin.x}px ${this.origin.y}px`;
  }

  toggleFullscreen() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const elem = document.querySelector('.gallery-modal') as HTMLElement;
    
    if (!this.isFullscreen()) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
      this.isFullscreen.set(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      this.isFullscreen.set(false);
    }
  }

  downloadImage() {
    if (!this.project?.gallery) return;
    
    const imageUrl = this.project.gallery[this.currentImageIndex()];
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${this.project.title}-${this.currentImageIndex() + 1}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  shareImage() {
    if (!isPlatformBrowser(this.platformId) || !this.project?.gallery) return;
    
    const imageUrl = this.project.gallery[this.currentImageIndex()];
    const shareData = {
      title: this.project.title,
      text: this.project.description,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        this.copyToClipboard(imageUrl);
      });
    } else {
      this.copyToClipboard(imageUrl);
    }
  }

  private copyToClipboard(text: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
      console.log('Link copied to clipboard!');
    });
  }

  toggleInfo() {
    this.showInfo.update(show => !show);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Add keyboard event listener
      document.addEventListener('keydown', this.handleKeydown);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Remove keyboard event listener
      document.removeEventListener('keydown', this.handleKeydown);
    }
  }

  handleKeydown = (event: KeyboardEvent) => {
    switch(event.key) {
      case 'Escape':
        this.closeGallery();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }

  closeGallery() {
    this.close.emit();
  }

  nextImage() {
    if (!this.project?.gallery) return;
    this.currentImageIndex.update(index => 
      (index + 1) % this.project!.gallery.length
    );
  }

  previousImage() {
    if (!this.project?.gallery) return;
    this.currentImageIndex.update(index => 
      index === 0 ? this.project!.gallery.length - 1 : index - 1
    );
  }

  goToImage(index: number) {
    this.currentImageIndex.set(index);
  }

  toggleZoom() {
    this.isZoomed.update(zoomed => !zoomed);
  }

  onBackdropClick(event: MouseEvent) {
    // Only close if clicking the backdrop itself, not its children
    if (event.target === event.currentTarget) {
      this.closeGallery();
    }
  }
}
