import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <a 
      href="https://wa.me/919492777773?text=Hi! I'm interested in your construction services" 
      target="_blank"
      class="whatsapp-float"
      aria-label="Contact us on WhatsApp">
      <fa-icon [icon]="faWhatsapp" class="whatsapp-icon" aria-hidden="true"></fa-icon>
    </a>
  `,
  styles: [`
    .whatsapp-float {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
      cursor: pointer;
      z-index: 999;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
      
      &:hover {
        transform: scale(1.1) translateY(-3px);
        box-shadow: 0 6px 30px rgba(37, 211, 102, 0.6);
      }
      
      &:active {
        transform: scale(0.95);
      }
      
      @media (max-width: 768px) {
        width: 50px;
        height: 50px;
        /* Place above the mobile bottom nav */
        bottom: calc(96px + env(safe-area-inset-bottom));
        right: 20px;
        z-index: 1003;
      }
    }
    
    .whatsapp-icon { font-size: 32px; animation: pulse 2s ease-in-out infinite; }
    @media (max-width: 768px) { .whatsapp-icon { font-size: 28px; } }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
  `]
})
export class WhatsappButtonComponent { faWhatsapp = faWhatsapp; }
