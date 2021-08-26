import { Component, OnInit } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router'
import { EventService } from '../services/events.service';
import { PopupService } from '../services/popup.service';

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

  ngOnInit(): void {
    this.popup.loading$.next(true);
    
    this.events.getEventsTocome()
    .then((response) => {
      this.eventsToCome = response;
      if (this.eventsToCome.length < 1) {
        
        this.eventExist = false;
        // this.eventsToCome = [{title : " ", description : " ", image : "../assets/img/const/noEvent.jpg"}] 
      }

      else {
        this.eventExist = true;
      }
      this.popup.loading$.next(false);
    })
    .catch((error) => {
      
      this.popup.state$.next([false, "Erreur : merci de contacter un administrateur"]);
      this.popup.loading$.next(false);
    })
  };

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }

}
