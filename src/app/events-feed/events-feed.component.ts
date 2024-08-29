import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-events-feed',
  templateUrl: './events-feed.component.html',
  styleUrls: ['./events-feed.component.scss']
})
export class EventsFeedComponent implements OnInit {
  events: Event[] = [];
  isLoading: boolean = true;  // Indicateur de chargement
  errorMessage: string = 'failed to load';  // Message d'erreur

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents() // Utilisez getEvents ici
      .then((response: Event[]) => {
        this.events = response;
        this.isLoading = false;  // Fin du chargement
      })
      .catch((error) => {
        this.errorMessage = 'Erreur lors de la récupération des événements';
        console.error('Error fetching events:', error);
        this.isLoading = false;  // Fin du chargement
      });
  }
}
