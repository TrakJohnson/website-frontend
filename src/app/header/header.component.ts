import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {AccountService} from '../services/account.service';
import {Account} from '../models/account.model';
import {PopupService} from '../services/popup.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private isAuthSub: Subscription;
  isAuth: boolean = false;

  private accountSub: Subscription;
  account: Account;

  mobileMenuOpen: boolean = false;

  constructor(private router: Router,
              private auth: AuthService,
              private acc: AccountService,
              private popup: PopupService) {
  }

  ngOnInit(): void {
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

  mobileMenuToggle(forceClose : boolean | null = null) {
    let closeMenuAction = forceClose == null ? this.mobileMenuOpen : forceClose
    if (closeMenuAction) {
      document.body.classList.remove("fixed");
      this.mobileMenuOpen = false;
    } else {
      document.body.classList.add("fixed");
      this.mobileMenuOpen = true;
    }
  }

  onNavigate(endpoint: string, triggerLoading: boolean) {
    this.mobileMenuToggle(true);
    if (triggerLoading) {
      this.popup.loading$.next(true);
    }
    this.router.navigate(['/'], {skipLocationChange: true})
      .then(() => this.router.navigate([endpoint]));
  }
}
