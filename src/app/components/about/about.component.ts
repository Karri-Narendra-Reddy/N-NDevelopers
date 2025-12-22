import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  values = [
    {
      icon: '🎯',
      title: 'Quality First',
      description: 'We never compromise on quality. Every project is executed with precision and attention to detail.'
    },
    {
      icon: '⏱️',
      title: 'Timely Delivery',
      description: 'We respect deadlines and ensure all projects are completed on schedule without delays.'
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'Clear, upfront pricing with no hidden costs. You know exactly what you\'re paying for.'
    },
    {
      icon: '🤝',
      title: 'Client Focus',
      description: 'Your vision is our mission. We work closely with clients to bring their dreams to life.'
    },
    {
      icon: '🏗️',
      title: 'Expert Team',
      description: 'Skilled professionals with years of experience in construction and development.'
    },
    {
      icon: '♻️',
      title: 'Sustainable',
      description: 'Eco-friendly practices and sustainable building methods for a better tomorrow.'
    }
  ];

  team = [
    {
      name: 'Naveen',
      role: 'Co-Founder & Managing Director',
      image: 'https://ui-avatars.com/api/?name=Naveen&size=200&background=6366f1&color=fff',
      description: 'Expert in project management and construction planning'
    },
    {
      name: 'Nikilesh',
      role: 'Co-Founder & Technical Director',
      image: 'https://ui-avatars.com/api/?name=Nikilesh&size=200&background=8b5cf6&color=fff',
      description: 'Specialist in land development and structural design'
    }
  ];

  achievements = [
    { number: '500+', label: 'Projects Completed' },
    { number: '15+', label: 'Years Experience' },
    { number: '1000+', label: 'Happy Clients' },
    { number: '50+', label: 'Expert Team Members' }
  ];
}
