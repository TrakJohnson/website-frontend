import { Component, OnInit } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router'
import { EventService } from '../services/events.service';
import { PopupService } from '../services/popup.service';
import { Event } from '../models/event.model';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(private router: Router,
              private events : EventService,
              private popup : PopupService) { }

  eventsToCome : any[] = [];
  eventExist : boolean = false;
  eventsLoaded : boolean = false;

  ngOnInit(): void {
    console.log('setting loading to true')
    this.popup.loading$.next(true);

    this.events.getEventsTocome()
    .then((response) => {
      this.eventsLoaded = true;
      this.eventsToCome = response;
      // TODO this should be moved to backend ?
      this.eventsToCome.sort((a, b) => {
        let date_a = new Date(a.dateEvent);
        let date_b = new Date(b.dateEvent);
        return date_a.getTime() > date_b.getTime() ? 1 : -1;
      })
      this.eventExist = this.eventsToCome.length >= 1;
      this.popup.loading$.next(false);
    })
    .catch((error) => {

      this.popup.state$.next([false, "Erreur : merci de contacter un administrateur"]);
      this.popup.loading$.next(false);
    })
  };

  getEventShortInfos(event : Event) : string {
    return `${event.event_place}, ${Event.getEventStrDay(event)}
    ${Event.getEventMonthDateStr(event)} ${Event.getEventMonthStrLong(event)}`;
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }

}
