import { Component, signal, AfterViewInit, OnDestroy, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';
import { ProjectGalleryComponent } from '../project-gallery/project-gallery.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ProjectGalleryComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  selectedCategory = signal<string>('all');
  maxDisplayed = 6;
  selectedProject = signal<Project | null>(null);
  clickOrigin = signal<{ x: number, y: number } | null>(null);
  projects = signal<Project[]>([]);
  
  categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'land-development', label: 'Land Development' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'parks', label: 'Parks' },
    { id: 'upcoming', label: 'Upcoming' }

    ];

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private projectService: ProjectService
  ) {
    // Load projects from service
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects);
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
    const filtered = this.selectedCategory() === 'all' 
      ? this.projects() 
      : this.projects().filter(p => p.category === this.selectedCategory());
    return filtered.slice(0, this.maxDisplayed);
  }

  get totalProjects(): number {
    return this.selectedCategory() === 'all' 
      ? this.projects().length 
      : this.projects().filter(p => p.category === this.selectedCategory()).length;
  }

  get hasMoreProjects(): boolean {
    return this.totalProjects > this.maxDisplayed;
  }

  viewAllProjects(): void {
    this.router.navigate(['/projects']);
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
    // Re-observe cards after filtering
    setTimeout(() => this.setupScrollAnimations(), 50);
  }

  openGallery(project: Project, event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    this.clickOrigin.set({ x, y });
    this.selectedProject.set(project);
  }

  closeGallery(): void {
    this.selectedProject.set(null);
    // Clear origin after animation completes
    setTimeout(() => this.clickOrigin.set(null), 400);
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
