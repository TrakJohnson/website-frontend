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
    // for (let i = 0; i < 10; i++) {
    //   this.events.push({
    //     title : "event " + i,
    //     link : "https://www.google.com",
    //     details : "best event of the year (i think so)",
    //     image : "https://picsum.photos/640/480?random=" + i});
    // };
  
    this.events.getEventsTocome()
    .then((response) => {
      this.eventsToCome = response;
      console.log(this.eventsToCome)
      if (this.eventsToCome.length < 1) {
        
        this.eventExist = false;
        // this.eventsToCome = [{title : " ", description : " ", image : "../assets/img/const/noEvent.jpg"}] 
      }

      else {
        this.eventExist = true;
      }
    })
    .catch((error) => {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Erreur : merci de contacter un administrateur"]);
      console.log(error.message);
    })
  };

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }

}
