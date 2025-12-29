import { Component, inject, NgZone, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, FontAwesomeModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private snackBar = inject(MatSnackBar);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  
  @ViewChild('contactForm') contactForm?: NgForm;
  // Replace this with your Google Apps Script Web App URL after setup
  googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyUr1j6NIgBOAHPDw-7yYDxt5EgbJzIjJ68nHuIVc5iR9HIQyrSdWSgrH8ReWg9_M-w/exec';
  
  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  // FontAwesome icons
  faEnvelope = faEnvelope;
  faLocationDot = faLocationDot;
  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    if (!this.formData.name || !this.formData.message) {
      this.showMessage('Please fill in your name and message.', false);
      return;
    }

    if (this.googleScriptUrl === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
      this.showMessage('Please configure Google Sheets integration first. Check console for instructions.', false);
      console.error('SETUP REQUIRED: Please follow the setup instructions in the README to configure Google Sheets.');
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    // Prepare data for Google Sheets
    const formDataToSend = new FormData();
    formDataToSend.append('name', this.formData.name);
    formDataToSend.append('email', this.formData.email);
    formDataToSend.append('phone', this.formData.phone);
    formDataToSend.append('message', this.formData.message);
    formDataToSend.append('timestamp', new Date().toISOString());

    // Use setTimeout to ensure the fetch runs in the next tick
    setTimeout(() => {
      fetch(this.googleScriptUrl, {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors' // This prevents CORS issues
      })
      .then(() => {
        // Run inside Angular zone to trigger change detection
        this.ngZone.run(() => {
          // With no-cors mode, we won't get response but submission works
          this.isSubmitting = false;
          this.resetForm();
          this.contactForm?.resetForm();
          this.showMessage('Thank you! Your message has been received. We will contact you soon.', true);
          this.cdr.detectChanges();
          // Show success toast
          this.snackBar.open('Message sent successfully!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        });
      })
      .catch((error) => {
        // Run inside Angular zone to trigger change detection
        this.ngZone.run(() => {
          console.error('Error submitting form:', error);
          this.isSubmitting = false;
          this.showMessage('There was an error sending your message. Please try contacting us directly via phone or WhatsApp.', false);
          this.cdr.detectChanges();
          // Show error toast
          this.snackBar.open('Failed to send message. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        });
      });
    }, 0);
  }

  showMessage(message: string, success: boolean): void {
    this.submitMessage = message;
    this.submitSuccess = success;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      this.submitMessage = '';
    }, 5000);
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }
}
