import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { EventService } from 'src/app/services/events.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit, OnDestroy {

  constructor(private accountService : AccountService, 
              private popup : PopupService,
              private event : EventService) { }

  accountSub : Subscription;
  account : Account | undefined;

  eventsSub : Subscription;
  events : any;

  ngOnInit(): void {
    this.popup.loading$.next(true);
    this.accountSub = this.accountService.compte$.subscribe(
      (dataAccount) => {
        console.log({account : dataAccount?.placesDemanded});
        this.account = dataAccount;
    });
    this.eventsSub = this.event.events$.subscribe(
      (dataEvents) => {
        this.events = dataEvents;
      }
    )
    this.event.getEvents();
    this.popup.loading$.next(false);;
  }

  ngOnDestroy() : void {
    this.accountService.compte$.unsubscribe();
    this.account = undefined;
  }

}
