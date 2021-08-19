import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";
import { PopupService } from "src/app/services/popup.service";



@Component({ selector: 'app-demandPassword',
templateUrl: './demandPassword.component.html',
styleUrls: ['./demandPassword.component.scss']
 })
export class DemandPasswordComponent implements OnInit {

  demandPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router : Router,
              private popup: PopupService,
              private acc : AccountService
              ) { }

  ngOnInit() {
    this.popup.loading$.next(true);
    this.demandPasswordForm = this.formBuilder.group({
      login: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
    this.popup.loading$.next(false);
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }

  onDemandSendEmail() {
    this.popup.loading$.next(true);
    const login = this.demandPasswordForm.get('login')!.value;
    const email = this.demandPasswordForm.get('email')!.value;
    this.acc.demandSendEmailChangePassword(login, email)
      .then(() => {
        this.popup.state$.next([true, "Demande envoyée !"]);
        this.popup.loading$.next(false);
      })
      .catch((error) => {
        this.popup.loading$.next(false);
        this.popup.state$.next([false, error.error.message]);
    });
  }
}

