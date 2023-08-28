import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { EventService } from 'src/app/services/events.service';
import { PoleService } from 'src/app/services/poles.service';
import { PopupService } from 'src/app/services/popup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {

  constructor(private accountService : AccountService,
              private popup : PopupService,
              private event : EventService,
              private router : Router) { }

  accountSub : Subscription;
  account : Account | undefined;

  eventsWithPlaceClaimed : any | undefined =  [];

  colorArr = ["orange", "red", "green"];
  textArr = ["Place pas encore traitée", "Place refusée", "Place acceptée"];

  colorAccordingToStatus(status : number) {
    return this.colorArr[status + 1];
  }

  textAccordingToStatus(status : number) {
    return this.textArr[status + 1];
  }

  ngOnInit(): void {
    this.accountSub = this.accountService.compte$.subscribe(
      async (dataAccount) => {
        this.account = dataAccount;
        this.eventsWithPlaceClaimed = {};
        const getPlaces = async () => {
          if (this.account?.placesClaimed.length) {
            for (var i = 0; i < this.account?.placesClaimed.length; i++) {
              if (this.account?.placesClaimed[i]) {
                const place = this.account?.placesClaimed[i];
                this.event.getOneEvent(place.event_id).then((data)=>{
                  this.eventsWithPlaceClaimed[place.event_id] = data;
                  console.log({here : this.eventsWithPlaceClaimed});
                  this.popup.loading$.next(false);
                }).catch((error)=>{
                  console.log("ERROR")
                  console.log(error)
                  this.popup.state$.next([false,"Impossible d'obtenir les événements"]);
                  this.popup.loading$.next(false);
                })
              }
            }
          }
        };
        await getPlaces();

    });
  }

  onNavigate(endpoint: string) {
    console.log('navigated to ' + endpoint)
    this.router.navigate([endpoint]);
  }

}
