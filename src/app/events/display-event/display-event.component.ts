import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { Place } from 'src/app/models/place.model';
import { AccountService } from 'src/app/services/account.service';
import { EventService } from 'src/app/services/events.service';
import { PoleService } from 'src/app/services/poles.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.scss']
})
export class DisplayEventComponent implements OnInit {

  constructor(private popup : PopupService,
              private route : ActivatedRoute,
              private router : Router,
              private eventService : EventService,
              private acc : AccountService,
              private poleService : PoleService) { }

  event_id : number;
  event : Event;
  is_billetterie :boolean;
  isAdmin : boolean | undefined = false;
  placesAccepted : Place[] = [];
  placesRejected : Place[] = [];
  isAuth : boolean | undefined = false;
  is_already_claimed : boolean  | undefined = false;
  accountSub : Subscription;
  on_sale : boolean;
  pole :string

  ngOnInit(): void {
    this.event_id = this.route.snapshot.params["event_id"] ;
    this.eventService.getOneEvent(this.event_id)
    .then((response) =>{
      console.log(response.pole_id)
      this.event = response;
      this.placesAccepted = this.event.placesClaimed.filter((place) => place.status);
      this.placesRejected = this.event.placesClaimed.filter((place) => !place.status);
      this.is_billetterie = this.event.is_billetterie;
      this.on_sale = this.event.on_sale;
      this.pole = this.poleService.IDToPole.get(Number(this.event.pole_id))!
      if (this.event.thumbnail == undefined || this.event.thumbnail.length < 1 || this.event.thumbnail == null) {
        this.event.thumbnail = "../../../assets/img/dev/default_event_pic.jpg"
      }
    })
    .catch((error)=> {
      this.popup.state$.next([false, error.message]);
    })

    this.accountSub = this.acc.compte$.subscribe(
      (status) => {
        if (status) {
          this.isAdmin = status.admin;
          this.isAuth = status.login != "";
          this.is_already_claimed = !status?.placesClaimed.every(place => {return place.event_id != this.event_id});
        }
    });

    this.acc.getPlacesClaimedByUser();
  }

  buttonToDisplay() {
    console.log({one : this.on_sale, two : this.on_sale});
    if (!this.on_sale || !this.isAuth) {
      return 0
    } else {
      console.log({claimed : this.is_already_claimed, out : this.is_already_claimed ? 1 : 2});
      return this.is_already_claimed ? 2 : 1;
    }
  }

  onClaimePlace(id_billetterie : number, size : number) {
    this.acc.claimePlace(id_billetterie, size)
    .then(() => {
      this.popup.state$.next([true, "Demande enregistrée"]);
      this.onNavigate('/events/display/' + this.event_id.toString());
    })
    .catch(() => {
      this.popup.state$.next([false, "Erreur lors de la demande, veuillez contacter l'administrateur immédiatement"]);
    })
  }

  onDeClaimePlace(id_billetterie : number) {
    this.acc.declaimePlace(id_billetterie)
    .then(() => {
      this.popup.state$.next([true, "Demande retirée"]);
      this.onNavigate('/events/display/' + this.event_id.toString());
    })
    .catch(() => {
      this.popup.state$.next([false, "Erreur lors de la demande, veuillez contacter l'administrateur immédiatement"]);
    })
  }

  async onCloseBilletterie() {
    this.eventService.closeBilletterie(this.event_id)
    .then(() => {
      this.popup.state$.next([true, "Billetterie fermée avec succès"]);
      this.onNavigate('/events/display/' + this.event_id.toString());
    })
    .catch(() => {
      this.popup.state$.next([false, "Erreur lors de la fermeture, veuillez contacter l'administrateur immédiatement"]);
    })
  }

  async onReSaleBilletterie() {
    this.eventService.reSaleBilletterie(this.event_id)
    .then(() => {
      this.popup.state$.next([true, "Billetterie rouverte avec succès"]);
      this.onNavigate('/events/display/' + this.event_id.toString());
    })
    .catch(() => {
      this.popup.state$.next([false, "Erreur lors de la réouverture, veuillez contacter l'administrateur immédiatement"]);
    })
  }

  onGivePlace(place : Place) {
    this.eventService.givePlaceToUser(place.event_id, place.login)
    this.onNavigate('/events/display/' + this.event_id.toString());
  }

  onRetirePlace(place : Place) {
    this.eventService.retirePlaceToUser(place.event_id, place.login)
    this.onNavigate('/events/display/' + this.event_id.toString());
  }

  onNavigate(endpoint: string) {
    // On navigate deux fois pour forcer le rechargement de la page
    this.router.navigate(['/'], {skipLocationChange: true}).then(()=> this.router.navigate([endpoint]));
  }

  ngOnDestroy() {
    this.accountSub.unsubscribe()
  }

}
