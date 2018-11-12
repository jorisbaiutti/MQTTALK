import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  register(): void {
    this.authService.register(this.username, this.password).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
