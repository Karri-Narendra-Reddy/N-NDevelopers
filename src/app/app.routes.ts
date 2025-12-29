import { Routes } from '@angular/router';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Navin & Nikilesh Constructions'
  },
  {
    path: 'projects',
    component: ProjectsPageComponent,
    title: 'Our Projects - Navin & Nikilesh Constructions'
  }
];
