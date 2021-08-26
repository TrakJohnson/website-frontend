import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { Subject, Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { EventService } from 'src/app/services/events.service';
import { Account } from 'src/app/models/account.model';
import { Event } from 'src/app/models/event.model'
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-viewBilletterie',
  templateUrl: './viewBilletterie.component.html',
  styleUrls: ['./viewBilletterie.component.scss']
})
export class ViewBilletterieComponent implements OnInit {

 

  constructor(private router : Router,
              private eventService : EventService,
              private acc : AccountService,
              private popup : PopupService) {}

  eventsToDisplay : any;
  isAdmin : boolean |undefined = false;
  accountSub : Subscription;
  isBilletterie : boolean;

  ngOnInit(): void {
    this.popup.loading$.next(true);
    this.eventService.getBilletteriesTocome()
    .then((response : Event[]) => {
      this.eventsToDisplay = response;
      this.isBilletterie = (this.eventsToDisplay.length > 0)
      this.popup.loading$.next(false);
    })
    .catch((error) => {
      this.popup.state$.next([false, error.message]);
      this.popup.loading$.next(false);
      
    })

    
    
    this.accountSub = this.acc.compte$.subscribe(
      (status) => {
        this.isAdmin = status?.admin;
      })

    
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);

  }

  ngOnDestroy() {
    this.accountSub.unsubscribe()
  }

}
