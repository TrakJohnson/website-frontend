import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { Pole } from 'src/app/models/pole.model';
import { AccountService } from 'src/app/services/account.service';
import { EventService } from 'src/app/services/events.service';
import { PoleService } from 'src/app/services/poles.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {

  constructor(private accountService : AccountService, 
              private popup : PopupService,
              private event : EventService,
              private pole : PoleService,
              private router : Router) { }

  accountSub : Subscription;
  account : Account | undefined;

  eventsSub : Subscription;
  events : any;

  polesSub : Subscription;
  poles : any;

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }

  ngOnInit(): void {
    this.popup.loading$.next(true);
    this.accountSub = this.accountService.compte$.subscribe(
      (dataAccount) => {
        this.account = dataAccount;
    });
    this.eventsSub = this.event.events$.subscribe(
      (dataEvents) => {
        this.events = dataEvents;
      }
    )
    this.polesSub = this.pole.poles$.subscribe(
      (polesData) => {
        this.poles = polesData;
      }
    )
    this.pole.getPoles();
    this.event.getEvents();
    this.popup.loading$.next(false);;
  }

}
