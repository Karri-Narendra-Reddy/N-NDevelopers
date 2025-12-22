import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a 
      href="https://wa.me/919490646336?text=Hi! I'm interested in your construction services" 
      target="_blank"
      class="whatsapp-float"
      aria-label="Contact us on WhatsApp">
      <svg viewBox="0 0 32 32" class="whatsapp-icon">
        <path fill="currentColor" d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.937 0-7.384 6.083-13.467 13.467-13.467s13.467 6.083 13.467 13.467-6.083 13.467-13.467 13.467zM21.713 18.54c-0.218-0.109-1.289-0.635-1.489-0.708s-0.345-0.109-0.49 0.109c-0.145 0.218-0.562 0.708-0.689 0.853s-0.254 0.163-0.472 0.054c-0.218-0.109-0.921-0.339-1.753-1.082-0.647-0.576-1.084-1.289-1.211-1.507s-0.013-0.335 0.096-0.444c0.098-0.097 0.218-0.254 0.327-0.381s0.145-0.218 0.218-0.363c0.073-0.145 0.036-0.272-0.018-0.381s-0.49-1.180-0.671-1.616c-0.177-0.425-0.356-0.368-0.49-0.374-0.127-0.006-0.272-0.008-0.417-0.008s-0.381 0.054-0.58 0.272c-0.199 0.218-0.762 0.744-0.762 1.816s0.78 2.107 0.889 2.252c0.109 0.145 1.534 2.343 3.713 3.286 0.519 0.224 0.924 0.358 1.239 0.458 0.521 0.166 0.995 0.143 1.369 0.087 0.418-0.063 1.289-0.527 1.471-1.036s0.182-0.945 0.127-1.036c-0.054-0.091-0.199-0.145-0.417-0.254z"/>
      </svg>
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
        bottom: 20px;
        right: 20px;
      }
    }
    
    .whatsapp-icon {
      width: 32px;
      height: 32px;
      animation: pulse 2s ease-in-out infinite;
      
      @media (max-width: 768px) {
        width: 28px;
        height: 28px;
      }
    }
    
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
export class WhatsappButtonComponent {}
