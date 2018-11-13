import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  email = new FormControl('', Validators.required);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]);

  constructor(public authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  login(): void {
    if (this.email.valid && this.password.valid) {
      this.authService.login(this.email.value, this.password.value).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }

  register(): void {
    if (this.email.valid && this.password.valid) {
      this.authService.register(this.email.value, this.password.value).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }

  logout(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    }
  }

  testAuth(): void {
    this.http.get('/api/test/someData').subscribe(res => {
      alert(res);
    });
  }

}
