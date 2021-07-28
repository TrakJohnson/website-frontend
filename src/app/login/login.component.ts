import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth : AuthService,
              private router : Router,
              ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }

  onLogin() {
    
    const login = this.loginForm.get('login')!.value;
    const password = this.loginForm.get('password')!.value;
    this.auth.login(login, password)
      .then(() => {
        // this.popup.loading$.next(false);
        // this.popup.state$.next([true, "Login successful !"]);
        this.router.navigate(['/monCompte']);
      })
      .catch((error) => {
        // this.popup.loading$.next(false);
        // this.popup.state$.next([false, error.error.message]);
        console.log("error to log")
      }
    );
  }
    
}
