import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { Subject, Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { EventService } from 'src/app/services/events.service';
import { Account } from 'src/app/models/account.model';
import { Event } from 'src/app/models/event.model'

@Component({
  selector: 'app-viewBilletterie',
  templateUrl: './viewBilletterie.component.html',
  styleUrls: ['./viewBilletterie.component.scss']
})
export class ViewBilletterieComponent implements OnInit {

 

  constructor(private router : Router,
              private eventService : EventService,
              private acc : AccountService) {}

  eventsToDisplay : any;
  isAdmin : boolean;
  accountSub : Subscription;
  isBilletterie : boolean;

  ngOnInit(): void {
   
    this.eventService.getEventsTocome()
    .then((response : Event[]) => {
      this.eventsToDisplay = response;
      console.log(this.eventsToDisplay)
      this.isBilletterie = (this.eventsToDisplay.length > 0)
    })

    

    this.accountSub = this.acc.compte$.subscribe(
      (status) => {
        this.isAdmin = status!.admin;
        console.log({"isAdmin" : this.isAdmin})
      }
    )

  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);

  }

  ngOnDestroy() {
    this.accountSub.unsubscribe()
  }

}
