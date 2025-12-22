import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services = [
    {
      icon: '🏗️',
      title: 'General Construction',
      description: 'Complete building construction services from foundation to finishing'
    },
    {
      icon: '🏘️',
      title: 'Land Development',
      description: 'Site planning, grading, utilities, and infrastructure development'
    },
    {
      icon: '🏢',
      title: 'Commercial Projects',
      description: 'Office buildings, retail spaces, and commercial complexes'
    },
    {
      icon: '🏡',
      title: 'Residential Building',
      description: 'Custom homes, apartments, and residential communities'
    },
    {
      icon: '🔧',
      title: 'Renovation & Remodeling',
      description: 'Interior and exterior renovations for all property types'
    },
    {
      icon: '📐',
      title: 'Project Management',
      description: 'Complete project oversight from planning to completion'
    }
  ];
}
