import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';

import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';
import { AccountService } from '../services/account.service';

import { Account } from '../models/account.model';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit, OnDestroy {

  constructor(private router : Router,
              private auth : AuthService,
              private acc : AccountService,
              private popup : PopupService) { }

  private isAuthSub: Subscription;
  isAuth: boolean = false;

  private accountSub: Subscription;
  account: Account;

  ngOnInit() {
    this.isAuthSub = this.auth.isAuth$.subscribe(
      (status) => {
        this.isAuth = status;
      }
    )
    this.accountSub = this.acc.compte$.subscribe(
      (account) => {
        this.account = account!;
      }
    )
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
    this.accountSub.unsubscribe();
  }

  onNavigate(endpoint: string, triggerLoading : boolean) {
    if (triggerLoading) {
      this.popup.loading$.next(true);
    }
    this.router.navigate(['/'], {skipLocationChange: true}).then(()=> this.router.navigate([endpoint]));
  }

  onDisconnect() {
    localStorage.removeItem('token');
    this.auth.logout();
    this.acc.disconnect();
    this.onNavigate('/', false);
  }

}
