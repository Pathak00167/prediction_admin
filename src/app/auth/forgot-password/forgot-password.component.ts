import { Component } from '@angular/core';
  import { FormBuilder, FormGroup } from '@angular/forms';
  import { AuthService } from '../auth.service';

  @Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
     
  })
  export class ForgotPasswordComponent {
    forgotPasswordForm: FormGroup;
      isSidebarOpen = false;
    
      toggleSidebar() {
        debugger
        this.isSidebarOpen = !this.isSidebarOpen;
      }

    constructor(private fb: FormBuilder, private authService: AuthService) {
      this.forgotPasswordForm = this.fb.group({
        email: ['']
      });
    }

    onSubmit() {
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(response => {
        console.log('Password reset link sent:', response);
        // Show a success message or navigate away
      }, error => {
        console.error('Error sending reset link:', error);
      });
    }

    
  }
