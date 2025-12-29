import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Project {
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
  stamp?: boolean;
}

interface ProjectsData {
  projects: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public projects$ = this.projectsSubject.asObservable();
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProjects();
  }

  private loadProjects() {
    this.loadingSubject.next(true);
    this.http.get<ProjectsData>('/projects.json')
      .pipe(
        tap((data) => {
          this.projectsSubject.next(data.projects);
          this.loadingSubject.next(false);
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Error loading projects:', error);
          this.loadingSubject.next(false);
        }
      });
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getProjectById(id: number): Project | undefined {
    return this.projectsSubject.value.find(project => project.id === id);
  }

  getProjectsByCategory(category: string): Project[] {
    if (category === 'all') {
      return this.projectsSubject.value;
    }
    return this.projectsSubject.value.filter(project => project.category === category);
  }

  refreshProjects() {
    this.loadProjects();
  }
}
