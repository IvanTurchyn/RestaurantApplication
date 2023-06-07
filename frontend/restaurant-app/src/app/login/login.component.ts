import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../alert/alert.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  roles = ['manager', 'waiter', 'client', 'chef'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: [this.roles[0], Validators.required] // Ustaw pierwszą rolę jako domyślną wartość
    });
  }

  // getter dla łatwego dostępu do pól formularza
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alertów przy wysyłaniu
    this.alertService.clear();

    // zatrzymaj tutaj, jeżeli formularz jest niepoprawny
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
