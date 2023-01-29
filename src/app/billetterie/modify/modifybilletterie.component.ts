import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PopupService } from 'src/app/services/popup.service';
import { AccountService } from '../../services/account.service';
import { EventService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-modifybilletterie',
  templateUrl: './modifybilletterie.component.html',
  styleUrls: ['./modifybilletterie.component.scss']
})
export class ModifyBilletterieComponent implements OnInit {

  modifierForm: FormGroup;

  id : number;

  file : File;
  resized_filePath : string;

  titre : string;
  description : string;
  lieu : string;
  date : Date;
  dateEnd : Date | undefined;
  filePath: string;
  idPole : number;
  dateOuverture : Date;
  dateFermeture : Date;
  nPlaces : number;
  prixC : number;
  prixNC : number;
  points : number;
  idcreator : string;
  sendMail : boolean = false;

  tmp_points : number;
  tmp_idPole : number;

  dateStr : string;
  dateEndStr : string;
  dateOuvertureStr : string;
  dateFermetureStr : string;

  public poles = [
    {value: '1', viewValue: 'Bureau'},
    {value: '2', viewValue: 'Pôle alternatif'},
    {value: '0', viewValue: 'Autre'},
  ]

  // public dateEvent :
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private account: AccountService,
              private popup: PopupService,
              private event: EventService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.popup.loading$.next(true);

    this.id = this.route.snapshot.params["event_id"];

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
      console.log(eventInfos)
      this.titre = eventInfos.title;
      this.description  = eventInfos.description;
      this.lieu  = eventInfos.event_place;

      // Shady things happening with dates
      // The problem is with the Date object
      this.dateStr = eventInfos.dateEvent
      this.date = new Date(this.dateStr)
      this.dateEndStr = eventInfos.dateEvent_end ? eventInfos.dateEvent_end : '1999-01-01T00:00:00'
      this.dateEnd = new Date(this.dateEndStr)  // TODO: allow an empty date
      this.dateOuvertureStr = eventInfos.date_open
      this.dateOuverture = new Date(this.dateOuvertureStr)
      this.dateFermetureStr = eventInfos.date_close
      this.dateFermeture = new Date(this.dateFermetureStr)

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

    this.router.navigate(["/billetterie/delete", {id : this.id}],  {skipLocationChange : true})
  }

  onModifyBilletterie() {
    this.popup.loading$.next(true);
    this.titre = this.modifierForm.get('titre')?.value;
    this.description = this.modifierForm.get('description')?.value;
    this.lieu = this.modifierForm.get('lieu')?.value;
    this.date = this.modifierForm.get('date')?.value;
    this.dateEnd = this.modifierForm.get('date_end')?.value;
    const date_min = new Date('2000-01-01T00:00:00')
    var date_end = new Date(this.dateEnd? this.dateEnd : '2000-01-01T00:00:00')
    if (this.dateEnd != undefined && date_end <= date_min) {
      this.dateEnd = undefined
    }
    this.dateOuverture = this.modifierForm.get('dateOuverture')?.value;
    this.dateFermeture = this.modifierForm.get('dateFermeture')?.value;
    this.nPlaces = this.modifierForm.get('nPlaces')?.value;
    this.prixC = this.modifierForm.get('prixC')?.value;
    this.prixNC = this.modifierForm.get('prixNC')?.value;

    if (this.tmp_idPole != null) {this.idPole = this.tmp_idPole};
    if (this.tmp_points != null) {this.points = this.tmp_points};

    if (this.dateFermeture < this.dateOuverture ) {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Les dates d'ouverture et fermture sont incohérentes"]);
    }

    else if (this.date < this.dateFermeture) {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "La billetterie ferme après le début de l'évènement"]);

    }

    else {

      if (this.filePath.length > 500000) { //TODO condition exacte à trouver

        this.resizeImage(this.filePath)
        .then((response:any)=>{
          this.resized_filePath = response;
          this.event.modifyBilletterie(this.id, this.titre, this.description, this.date, this.dateEnd, this.lieu, this.resized_filePath, this.idPole, this.dateOuverture, this.dateFermeture, this.nPlaces, this.prixC, this.prixNC, this.points, this.sendMail)
            .then((response) => {
              this.popup.loading$.next(false);
              this.popup.state$.next([true, "Billetterie créé !"]);
              this.router.navigate(['/event/display/'+this.id]);
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
        this.event.modifyBilletterie(this.id, this.titre, this.description, this.date, this.dateEnd, this.lieu, this.resized_filePath, this.idPole, this.dateOuverture, this.dateFermeture, this.nPlaces, this.prixC, this.prixNC, this.points, this.sendMail)
          .then((response) => {
            this.popup.loading$.next(false);
            this.popup.state$.next([true, "Billetterie modifiée !"]);
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
