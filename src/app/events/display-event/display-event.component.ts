import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { AccountService } from 'src/app/services/account.service';
import { EventService } from 'src/app/services/events.service';
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
              private acc : AccountService) { }

  event_id : number;
  event : Event;
  is_billetterie :boolean;
  isAdmin : boolean | undefined = false;
  accountSub : Subscription;
  on_sale : boolean;

  ngOnInit(): void {
    this.event_id = this.route.snapshot.params["event_id"] ;

    this.eventService.getOneEvent(this.event_id)
    .then((response) =>{
      this.event = response;
      this.is_billetterie = this.event.is_billetterie;
      this.on_sale = this.event.on_sale;
      
      if (this.event.thumbnail == undefined || this.event.thumbnail.length < 1 || this.event.thumbnail == null) {
        this.event.thumbnail = "../../../assets/img/dev/default_event_pic.jpg"
      }

      
    })
    .catch((error)=> {
      this.popup.state$.next([false, error.message]);
    })

    this.accountSub = this.acc.compte$.subscribe(
      (status) => {
        console.log(status)
        this.isAdmin = status?.admin;
        console.log({"isAdmin" : this.isAdmin})
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

  onNavigate(endpoint: string) {
    console.log({newEndpoint : endpoint});
    this.router.navigate(['/'], {skipLocationChange: true}).then(()=> this.router.navigate([endpoint]));
  }

  ngOnDestroy() {
    this.accountSub.unsubscribe()
  }

}
