import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PopupService } from 'src/app/services/popup.service';
import { EventService } from 'src/app/services/events.service';



@Component({
  selector: 'app-deleteEvent',
  templateUrl: './deleteEvent.component.html',
  styleUrls: ['./deleteEvent.component.scss']
})
export class DeleteEventComponent implements OnInit {
 
 

  constructor(private router: Router,
              private popup: PopupService,
              private event: EventService,
              private route : ActivatedRoute) { }

  id : number;
  
  ngOnInit() {
    this.popup.loading$.next(false);

    this.id = this.route.snapshot.params["id"]

  }

  onConfirmation(){
    this.event.deleteEvent(this.id)
    .then((response)=> {
      this.popup.loading$.next(false);
      this.popup.state$.next([true, "L'évènement a bien été supprimée"]);
      this.router.navigate(["/default"])
    })
    .catch((error) => {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Erreur, contactez un admin"]);
    })
  }

}
