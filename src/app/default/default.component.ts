import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/events.service';
import { PopupService } from '../services/popup.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  selectedEventIndex: number = 0;

  constructor(private router: Router,
              private events: EventService,
              private popup: PopupService) { }

  eventsToCome: (Event | null)[] = [];
  eventExist: boolean = false;
  eventsLoaded: boolean = false;

  ngOnInit(): void {
    console.log('setting loading to true');
    this.popup.loading$.next(true);

    this.events.getEventsTocome()
      .then((response) => {
        this.eventsLoaded = true;

        // Ajouter les événements factices ici s'il n'y a pas assez d'événements
        if (response.length === 0) {
          this.loadFakeEvents(); // Charge les événements factices si la base de données est vide
        } else {
          this.eventsToCome = response.slice(0, 4); // Prend jusqu'à 4 événements de la base de données
          this.eventsToCome.sort((a, b) => {
            let date_a = new Date(a?.dateEvent ?? '');
            let date_b = new Date(b?.dateEvent ?? '');
            return date_a.getTime() > date_b.getTime() ? 1 : -1;
          });
        }

        // Compléter avec des emplacements vides si nécessaire
        while (this.eventsToCome.length < 4) {
          this.eventsToCome.push(null);
        }

        this.eventExist = this.eventsToCome.length > 0;
        this.popup.loading$.next(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des événements", error);
        this.loadFakeEvents(); // Charge les événements factices en cas d'erreur
        this.eventExist = false;
        this.popup.state$.next([false, "Erreur : merci de contacter un administrateur"]);
        this.popup.loading$.next(false);
      });
  }

  loadFakeEvents(): void {
    this.eventsToCome = [
      new Event({
        event_id: 1,
        title: "Concert de musique classique",
        description: "Un concert incroyable avec des artistes de renom.",
        dateEvent: new Date(),
        dateEvent_end: new Date(),
        event_place: "Opéra de Paris",
        pole_id: "1",
        login_creator: "admin",
        date_open: new Date(),
        date_close: new Date(),
        num_places: 100,
        cost_contributor: 20,
        cost_non_contributor: 30,
        points: 10,
        on_sale: true,
        is_billetterie: true,
        thumbnail: "https://via.placeholder.com/150",
        placesClaimed: []
      }),
      new Event({
        event_id: 2,
        title: "Exposition d'art moderne",
        description: "Découvrez les dernières tendances de l'art moderne.",
        dateEvent: new Date(),
        dateEvent_end: new Date(),
        event_place: "Centre Pompidou",
        pole_id: "2",
        login_creator: "admin",
        date_open: new Date(),
        date_close: new Date(),
        num_places: 200,
        cost_contributor: 15,
        cost_non_contributor: 25,
        points: 8,
        on_sale: true,
        is_billetterie: true,
        thumbnail: "https://via.placeholder.com/150",
        placesClaimed: []
      }),
    ];

    // Compléter avec des emplacements vides si nécessaire
    while (this.eventsToCome.length < 4) {
      this.eventsToCome.push(null);
    }
  }

  onSelectEvent(index: number): void {
    this.selectedEventIndex = index;
  }

  getEventShortInfos(event: Event | null): string {
    if (!event) {
      return 'Données non disponibles'; // ou un message par défaut approprié
    }
    return `${event.event_place}, ${Event.getEventStrDay(event)}
    ${Event.getEventMonthDateStr(event)} ${Event.getEventMonthStrLong(event)}`;
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }
}
