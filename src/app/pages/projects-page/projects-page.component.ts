import { Component, signal, AfterViewInit, OnDestroy, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  selectedCategory = signal<string>('all');
  
  categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'land-development', label: 'Land Development' },
    { id: 'renovation', label: 'Renovation' }
  ];

  projects: Project[] = [
    {
      id: 1,
      title: 'Modern Residential Complex',
      category: 'residential',
      description: 'Luxury apartment complex with 150 units and modern amenities',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      tags: ['Residential', 'Modern', 'Luxury']
    },
    {
      id: 2,
      title: 'Downtown Office Tower',
      category: 'commercial',
      description: '30-story commercial building in the heart of the city',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      tags: ['Commercial', 'High-rise', 'Office']
    },
    {
      id: 3,
      title: 'Suburban Land Development',
      category: 'land-development',
      description: '200-acre residential community with infrastructure',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      tags: ['Land Development', 'Community', 'Planning']
    },
    {
      id: 4,
      title: 'Historic Building Renovation',
      category: 'renovation',
      description: 'Restored 1920s building into modern mixed-use space',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      tags: ['Renovation', 'Historic', 'Preservation']
    },
    {
      id: 5,
      title: 'Luxury Villa Estate',
      category: 'residential',
      description: 'Custom-built 10,000 sq ft estate with premium finishes',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      tags: ['Residential', 'Luxury', 'Custom']
    },
    {
      id: 6,
      title: 'Shopping Center Development',
      category: 'commercial',
      description: 'Modern retail complex with 50+ stores and entertainment',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      tags: ['Commercial', 'Retail', 'Entertainment']
    },
    {
      id: 7,
      title: 'Industrial Park Layout',
      category: 'land-development',
      description: '500-acre industrial park with logistics facilities',
      image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800',
      tags: ['Land Development', 'Industrial', 'Logistics']
    },
    {
      id: 8,
      title: 'Heritage Home Restoration',
      category: 'renovation',
      description: 'Complete restoration of Victorian-era mansion',
      image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800',
      tags: ['Renovation', 'Heritage', 'Restoration']
    },
    {
      id: 9,
      title: 'Waterfront Condominiums',
      category: 'residential',
      description: 'Luxury waterfront living with panoramic views',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      tags: ['Residential', 'Waterfront', 'Luxury']
    },
    {
      id: 10,
      title: 'Corporate Headquarters',
      category: 'commercial',
      description: 'State-of-the-art tech company headquarters',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      tags: ['Commercial', 'Modern', 'Tech']
    },
    {
      id: 11,
      title: 'Mixed-Use Development',
      category: 'commercial',
      description: 'Integrated residential and commercial space',
      image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=800',
      tags: ['Commercial', 'Mixed-Use', 'Urban']
    },
    {
      id: 12,
      title: 'Eco-Friendly Community',
      category: 'land-development',
      description: 'Sustainable residential development with green spaces',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800',
      tags: ['Land Development', 'Eco-Friendly', 'Sustainable']
    }
  ];

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.selectedCategory());
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
    setTimeout(() => this.setupScrollAnimations(), 50);
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
