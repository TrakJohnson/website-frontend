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

  completeDate : string
  completeDateOuverture : string;
  completeDateFermeture : string;

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

    // this.id = this.route.snapshot.params["id"]
    this.id = 15;

    this.modifierForm = this.formBuilder.group({
      titre: [null],
      description: [null],
      lieu: [null],
      date: [null],
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


   
    

    this.event.getOneBilletterie(this.id)
    .then((eventInfos : any) => {
      this.titre = eventInfos.title;
      this.description  = eventInfos.description;
      this.lieu  = eventInfos.event_place;
      var date = new Date(eventInfos.dateEvent); //here is the WORST way of casting a string to date
      this.date = date;
      this.completeDate = this.date.toISOString().slice(0, -5);
      var dateOuverture = new Date(eventInfos.date_open);
      this.dateOuverture = dateOuverture;
      this.completeDateOuverture = this.dateOuverture.toISOString().slice(0, -5);
      var dateFermeture = new Date(eventInfos.date_close)
      this.dateFermeture = dateFermeture;
      this.completeDateFermeture = this.dateFermeture.toISOString().slice(0, -5);
      this.nPlaces  = eventInfos.num_places;
      this.prixC  = eventInfos.cost_contributor;
      this.prixNC  = eventInfos.cost_non_contributor;
      this.idcreator = eventInfos.login_creator;
      this.points = eventInfos.points;
      this.idPole = eventInfos.pole_id

      
      console.log({"eventInfos" : eventInfos})
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
      console.log("origin : " + this.filePath.length)

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
    console.log(this.modifierForm.get('lieu'))
    this.date = this.modifierForm.get('date')?.value;
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
          console.log("resized : " + this.resized_filePath.length);
          this.event.modifyBilletterie(this.id, this.titre, this.description, this.date, this.lieu, this.resized_filePath, this.idPole, this.dateOuverture, this.dateFermeture, this.nPlaces, this.prixC, this.prixNC, this.points, this.sendMail)
            .then((response) => {
              this.popup.loading$.next(false);
              this.popup.state$.next([true, "Billetterie créé !"]);
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
        console.log("no resize")
        this.resized_filePath = this.filePath;
        this.event.modifyBilletterie(this.id, this.titre, this.description, this.date, this.lieu, this.resized_filePath, this.idPole, this.dateOuverture, this.dateFermeture, this.nPlaces, this.prixC, this.prixNC, this.points, this.sendMail)
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
