import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  token : string;

  constructor(private account: AccountService,
              private router : Router,
              private route: ActivatedRoute,
              private popup: PopupService) { }

  ngOnInit(): void {
    this.popup.loading$.next(true);
    this.token = this.route.snapshot.params['token'];

    // Envoi du token 

    this.account.verifyEmail(this.token)
    .then(() => {
        this.popup.state$.next([true, "Email vérifié !"]);
        this.popup.loading$.next(false);
        this.onNavigate('login');
    })
    .catch((error) => {
        this.popup.loading$.next(false);
        this.popup.state$.next([false, error.error.message]);
    });
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }
}
