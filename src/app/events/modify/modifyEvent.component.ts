import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PopupService } from 'src/app/services/popup.service';
import { AccountService } from '../../services/account.service';
import { EventService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-modifyEvent',
  templateUrl: './modifyEvent.component.html',
  styleUrls: ['./modifyEvent.component.scss']
})
export class ModifyEventComponent implements OnInit {

  modifierForm: UntypedFormGroup;

  id : number;

  file : File;
  resized_filePath : string;

  titre : string;
  description : string;
  lieu : string;
  date : Date;
  date_end : Date |undefined;
  filePath: string;
  idPole : number;
  nPlaces : number|undefined;
  prixC : number|undefined;
  prixNC : number|undefined;
  points : number|undefined;
  idcreator : string;
  sendMail : boolean = false;

  tmp_points : number;
  tmp_idPole : number;

  completeDate : string;
  completeDate_end : string;

  public poles = [
    {value: '1', viewValue: 'Bureau'},
    {value: '2', viewValue: 'Pôle alternatif'},
    {value: '0', viewValue: 'Autre'},
  ]

  // public dateEvent :

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private account: AccountService,
              private popup: PopupService,
              private event: EventService,
              private route : ActivatedRoute) { }



  ngOnInit() {
    this.popup.loading$.next(true);

    this.id = this.route.snapshot.params["event_id"]

    this.modifierForm = this.formBuilder.group({
      titre: [null],
      description: [null],
      lieu: [null],
      date: [null],
      date_end : [null],
      image: [null],
      idPole: [null],
      dateOuverture : [null],
      dateFermeture : [null],
      nPlaces : [null],
      prixC : [null],
      prixNC : [null],
      points : [null],
      sendMail: [false]
    });

    this.popup.loading$.next(false);





    this.event.getOneEvent(this.id)
    .then((eventInfos : any) => {
      this.titre = eventInfos.title;
      this.description  = eventInfos.description;
      this.lieu  = eventInfos.event_place;
      var date = new Date(eventInfos.dateEvent); //here is the WORST way of casting a string to date
      this.date = date;
      this.completeDate = this.date.toISOString().slice(0, -5);


      var date_end = new Date(eventInfos.dateEvent_end? eventInfos.dateEvent_end : '1999-01-01T00:00:00');
      this.date_end = date_end;
      this.completeDate_end = this.date_end.toISOString().slice(0, -5);

      this.nPlaces  = eventInfos.num_places;
      this.prixC  = eventInfos.cost_contributor;
      this.prixNC  = eventInfos.cost_non_contributor;
      this.idcreator = eventInfos.login_creator;
      this.points = eventInfos.points;
      this.idPole = eventInfos.pole_id

      this.filePath = eventInfos.thumbnail



    })
    .catch((error) =>{
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Erreur lors du chargement de l'évènement"]);
    })

  }

  fileChangedEvent(e : any) {
    this.file = (e.target as HTMLInputElement).files![0];

    this.modifierForm.patchValue({
      img: this.file
    });


    this.modifierForm.get('image')?.updateValueAndValidity()

    const reader = new FileReader();
    reader.readAsDataURL(this.file as Blob)
    reader.onload = () => {
      this.filePath = reader.result as string;

      let img = new Image();
      img.src = this.filePath;
      img.onload = () => {
        if (img.width/img.height > 1.4 || img.width/img.height < 1.25){
          this.popup.loading$.next(false);
          this.popup.state$.next([false, "L'image n'est pas au format 4/3, merci de la redimensionner"]);
        }
      }


    }


  }


  resizeImage = (base64Str : string, maxWidth = 720, maxHeight = 540) => {
    return new Promise((resolve) => {
      let img = new Image()
      img.src = base64Str
      img.onload = () => {
        let canvas = document.createElement('canvas')
        const MAX_WIDTH = maxWidth
        const MAX_HEIGHT = maxHeight
        let width = img.width
        let height = img.height


        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }
        canvas.width = width
        canvas.height = height
        let ctx = canvas.getContext('2d')
        ctx!.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL())
      }
    })
  }


  onPointsChange(){
    this.tmp_points = this.modifierForm.get('points')?.value;
  }

  onPoleChange(){
    this.tmp_points = this.modifierForm.get('idPole')?.value;
  }

  onChangeMail() {
    this.sendMail = !this.sendMail;
  }

  onDelete(){

    this.router.navigate(["/events/delete", {id : this.id}],  {skipLocationChange : true})
  }

  onModifyEvent() {
    this.popup.loading$.next(true);
    this.titre = this.modifierForm.get('titre')?.value;
    this.description = this.modifierForm.get('description')?.value;
    this.lieu = this.modifierForm.get('lieu')?.value;
    this.date = this.modifierForm.get('date')?.value;
    this.date_end = this.modifierForm.get('date_end')?.value;
    const date_min = new Date('2000-01-01T00:00:00')
    var date_end = new Date(this.date_end? this.date_end : '2000-01-01T00:00:00')
    if (this.date_end != undefined && date_end <= date_min) {
      this.date_end = undefined
    }
    this.nPlaces = this.modifierForm.get('nPlaces')?.value;
    this.prixC = this.modifierForm.get('prixC')?.value;
    this.prixNC = this.modifierForm.get('prixNC')?.value;

    if (this.tmp_idPole != null) {this.idPole = this.tmp_idPole};
    if (this.tmp_points != null) {this.points = this.tmp_points};

    if (this.date_end != undefined && this.date_end < this.date ) {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Les dates sont incohérentes"]);
    }

    else {

      if (this.filePath.length > 500000) { //TODO condition exacte à trouver

        this.resizeImage(this.filePath)
        .then((response:any)=>{
          this.resized_filePath = response;
          this.event.modifyEvent(this.id, this.titre, this.description, this.date, this.date_end, this.lieu, this.resized_filePath, this.idPole, undefined, undefined, this.nPlaces, this.prixC, this.prixNC, 0, false)
            .then((response) => {
              this.popup.loading$.next(false);
              this.popup.state$.next([true, "Evenement modifié !"]);
              this.router.navigate(['/default']);
            })
            .catch((error) => {
              // this.popup.loading$.next(false);
              // this.popup.state$.next([false, error.error.message]);
              this.popup.loading$.next(false);
              this.popup.state$.next([false, "ERROR"]);
            });
        })
        .catch((error)=> {
          this.popup.loading$.next(false);
          this.popup.state$.next([false, error]);
        })
      }
      else {
        this.resized_filePath = this.filePath;
        this.event.modifyEvent(this.id, this.titre, this.description, this.date, this.date_end, this.lieu, this.resized_filePath, this.idPole, undefined, undefined, this.nPlaces, this.prixC, this.prixNC, 0, false)
          .then((response) => {
            this.popup.loading$.next(false);
            this.popup.state$.next([true, "Evènement modifiée !"]);
            this.router.navigate(['/default']);
          })
          .catch((error) => {
            // this.popup.loading$.next(false);
            // this.popup.state$.next([false, error.error.message]);
            this.popup.loading$.next(false);
            this.popup.state$.next([false, "ERROR"]);
          });
      }
    }
  }
}
