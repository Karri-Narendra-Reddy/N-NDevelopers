import { Component, signal, AfterViewInit, OnDestroy, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { ProjectGalleryComponent } from '../../components/project-gallery/project-gallery.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, ProjectGalleryComponent],
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  selectedCategory = signal<string>('all');
  allProjects = signal<Project[]>([]);
  isLoading = signal<boolean>(true);
  selectedProject = signal<Project | null>(null);
  clickOrigin = signal<{ x: number, y: number } | null>(null);
  
  categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'land-development', label: 'Land Development' },
    { id: 'parks', label: 'Parks' },
    { id: 'upcoming', label: 'Upcoming' }
  ];

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private projectService: ProjectService
  ) {
    // Load projects from service
    this.projectService.projects$.subscribe(projects => {
      this.allProjects.set(projects);
      this.isLoading.set(false);
    });
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  get filteredProjects(): Project[] {
    if (this.selectedCategory() === 'all') {
      return this.allProjects();
    }
    return this.allProjects().filter(p => p.category === this.selectedCategory());
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
    setTimeout(() => this.setupScrollAnimations(), 50);
  }

  openGallery(project: Project, event: MouseEvent): void {
    this.selectedProject.set(project);
    
    // Get click position for animation origin
    if (isPlatformBrowser(this.platformId)) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      this.clickOrigin.set({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  }

  closeGallery(): void {
    this.selectedProject.set(null);
    this.clickOrigin.set(null);
  }

  private setupScrollAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.observer) {
      this.observer.disconnect();
    }

    const options = {
      threshold: 0.1,
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

    const cards = this.elementRef.nativeElement.querySelectorAll('.project-card');
    cards.forEach((card: Element) => this.observer?.observe(card));
  }
}
