import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { AccountService } from '../../services/account.service';
import { EventService } from 'src/app/services/events.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-createbilletterie',
  templateUrl: './createbilletterie.component.html',
  styleUrls: ['./createbilletterie.component.scss']
})
export class CreateBilletterieComponent implements OnInit {

  creatorForm: FormGroup;

  filePath: string;

  file : File;
  base64 : string;

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
              private event: EventService) { }


  
  ngOnInit() {
    this.popup.loading$.next(true);

    this.creatorForm = this.formBuilder.group({
      titre: [null, [Validators.required]],
      description: [null, [Validators.required]],
      lieu: [null, [Validators.required]],
      date: [null, [Validators.required]],
      image: [null],
      idPole: [null, [Validators.required]],
      dateOuverture : [null, [Validators.required]],
      dateFermeture : [null, [Validators.required]],
      nPlaces : [null, [Validators.required]],
      prixC : [null, [Validators.required]],
      prixNC : [null, [Validators.required]],
      points : [null, [Validators.required]],
    });
    
    this.popup.loading$.next(false);
  }
  
  fileChanged(e : any) {
    this.file = (e.target as HTMLInputElement).files![0];
    
    this.creatorForm.patchValue({
      img: this.file
    });

    this.creatorForm.get('image')?.updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(this.file)
  }




  
  

  onCreateBilletterie() {
    this.popup.loading$.next(true);
    const titre = this.creatorForm.get('titre')!.value;
    const description = this.creatorForm.get('description')!.value;
    const lieu = this.creatorForm.get('lieu')!.value;
    const date : Date = this.creatorForm.get('date')!.value;
    const dateOuverture : Date = this.creatorForm.get('dateOuverture')!.value;
    const dateFermeture : Date = this.creatorForm.get('dateFermeture')!.value;
    const nPlaces : number = this.creatorForm.get('nPlaces')!.value;
    const prixC : number = this.creatorForm.get('prixC')!.value;
    const prixNC : number = this.creatorForm.get('prixNC')!.value;
    const points : number = this.creatorForm.get('points')!.value;
    const idPole : number = this.creatorForm.get('idPole')!.value;

    console.log(this.file )

    if (this.file == undefined) {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Il faut upload une vignette"]);
    }
    else {

  
  // TODO SECTION :  get createur id (login)

      const createurid = "20test";

  ////////////////////////////////////

      if (dateFermeture < dateOuverture ) {
        this.popup.loading$.next(false);
        this.popup.state$.next([false, "Les dates d'ouverture et fermture sont incohérentes"]);
      }

      else if (date < dateFermeture) {
        this.popup.loading$.next(false);
        this.popup.state$.next([false, "La billetterie ferme après le début de l'évènement"]);

      }

      else {

        //TODO : verifier que l'image n'est pas trop grande et la compresser au besoin

        let reader = new FileReader();
        reader.readAsDataURL(this.file as Blob);
        reader.onload = () => { 
          this.base64 = reader.result as string;
          console.log("result = " + this.base64)

          this.event.createBilletterie(titre, description, date, lieu, this.base64, idPole, createurid, dateOuverture, dateFermeture, nPlaces, prixC, prixNC, points)
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
        }
        
      

       
      }
    }
  }
}
