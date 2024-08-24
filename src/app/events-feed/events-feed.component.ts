import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/events.service'; // Ajustez le chemin si nécessaire
import { Event } from 'src/app/models/event.model';


@Component({
  selector: 'app-events-feed',
  templateUrl: './events-feed.component.html',
  styleUrls: ['./events-feed.component.scss']
})
export class EventsFeedComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents() // Utilisez getEvents ici
      .then((response: Event[]) => {
        this.events = response;
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }
}
