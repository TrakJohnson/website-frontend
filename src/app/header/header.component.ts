import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.model';

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



  constructor(private router: Router,
    private auth: AuthService,
    private acc: AccountService) { }

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


  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }
}
