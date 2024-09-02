import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    this.errorMessage = null;  // Reset the error message before a new login attempt
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(response => {
        if (response.role === 'Admin') {
          // Save the token and navigate to the admin page
          localStorage.setItem('token', response.token);
          this.router.navigate(['forgot-password']);
        } else {
          this.errorMessage = 'Access denied. Only admin can log in.';
        }
      }, error => {
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      });
    }
  }
}
