import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';


@Component({ selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']
 })
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth : AuthService,
              private router : Router,
              private popup: PopupService,
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
        this.router.navigate(['/default']);
      })
      .catch((error) => {
        this.popup.state$.next([false, error.error.message]);
      }
    );
  }
    
}
