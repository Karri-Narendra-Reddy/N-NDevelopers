import { Routes } from '@angular/router';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Naveen & Nikilesh Constructions'
  },
  {
    path: 'projects',
    component: ProjectsPageComponent,
    title: 'Our Projects - Naveen & Nikilesh Constructions'
  }
];
