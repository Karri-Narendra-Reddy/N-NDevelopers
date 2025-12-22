import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  onSubmit(): void {
    console.log('Form submitted:', this.formData);
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    this.resetForm();
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
