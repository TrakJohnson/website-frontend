import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { PopupService } from 'src/app/services/popup.service';
import { AccountService } from '../../services/account.service';
import { EventService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';
import { PoleService } from 'src/app/services/poles.service';



@Component({
  selector: 'app-createEvent',
  templateUrl: './createEvent.component.html',
  styleUrls: ['./createEvent.component.scss']
})
export class CreateEventComponent implements OnInit {

  creatorForm: FormGroup;

  filePath: string;

  file : File;
  resized_filePath : string;




  accountSub : Subscription;
  createurid : string;

  // public dateEvent :

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private account: AccountService,
              private popup: PopupService,
              private event: EventService,
              private poleService : PoleService) { }


  public poles = this.poleService.PoleForView;

  ngOnInit() {
    this.popup.loading$.next(true);

    this.creatorForm = this.formBuilder.group({
      titre: [null, [Validators.required]],
      description: [null, [Validators.required]],
      lieu: [null, [Validators.required]],
      date: [null, [Validators.required]],
      date_end : [null],
      image: [null],
      idPole: [null],
      nPlaces : [null],
      prixC : [null],
      prixNC : [null],
      points : [null],
    });
    
    this.popup.loading$.next(false);
    this.accountSub = this.account.compte$.subscribe(
      (account) => {
        this.createurid = account!.login;
      }
    )
  }
  
  fileChangedEvent(e : any) {
    this.file = (e.target as HTMLInputElement).files![0];
    
    this.creatorForm.patchValue({
      img: this.file
    });


    this.creatorForm.get('image')?.updateValueAndValidity()

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

  oncreateEvent() {
    this.popup.loading$.next(true);
    const titre = this.creatorForm.get('titre')!.value;
    const description = this.creatorForm.get('description')!.value;
    const lieu = this.creatorForm.get('lieu')!.value;
    const date : Date = this.creatorForm.get('date')!.value;
    const date_end : Date = this.creatorForm.get('date_end')?.value;
    const nPlaces : number = this.creatorForm.get('nPlaces')?.value;
    const prixC : number = this.creatorForm.get('prixC')?.value;
    const prixNC : number = this.creatorForm.get('prixNC')?.value;
    const idPole : number = this.creatorForm.get('idPole')!.value;

    if (this.file == undefined) {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Il faut upload une vignette"]);
    }
    else {
      if (date > date_end) {
        this.popup.loading$.next(false);
        this.popup.state$.next([false, "Les dates sont incohérentes"]);
      }

      else {

        if (this.filePath.length > 500000) { //TODO condition exacte à trouver

          this.resizeImage(this.filePath)
          .then((response:any)=>{
            this.resized_filePath = response;
            this.event.createEvent(titre, description, date, date_end, lieu, this.resized_filePath, idPole, this.createurid, undefined, undefined, nPlaces, prixC, prixNC, undefined, false)
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
          this.resized_filePath = this.filePath;
          this.event.createEvent(titre, description, date, date_end, lieu, this.resized_filePath, idPole, this.createurid, undefined, undefined, nPlaces, prixC, prixNC, undefined, false)
            .then((response) => {
              this.popup.loading$.next(false);
              this.popup.state$.next([true, "Evènement créé !"]);
              this.router.navigate(['/default']); 
            })
            .catch((error) => {
              // this.popup.loading$.next(false);
              // this.popup.state$.next([false, error.error.message]);
              this.popup.loading$.next(false);
              this.popup.state$.next([false, "Erreur, contactez un admin"]);
            });
        }

      }
    }
  }
}
