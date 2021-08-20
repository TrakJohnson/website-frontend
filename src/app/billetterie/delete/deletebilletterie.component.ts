import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PopupService } from 'src/app/services/popup.service';
import { EventService } from 'src/app/services/events.service';



@Component({
  selector: 'app-deletebilletterie',
  templateUrl: './deletebilletterie.component.html',
  styleUrls: ['./deletebilletterie.component.scss']
})
export class DeleteBilletterieComponent implements OnInit {
 
 

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
    this.event.deleteBilletterie(this.id)
    .then((response)=> {
      this.popup.loading$.next(false);
      this.popup.state$.next([true, "La billetterie a bien été supprimée, un mail a été envoyé à toutes les personnes ayant réservées une place et à son créateur."]);
      this.router.navigate(["/default"])
    })
    .catch((error) => {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Erreur, contactez un admin"]);
    })
  }

}
