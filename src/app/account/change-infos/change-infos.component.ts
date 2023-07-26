import { Component, OnInit, /*SystemJsNgModuleLoaderConfig */} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AuthService } from 'src/app/services/auth.service';
import { PopupService } from 'src/app/services/popup.service';
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-change_infos',
  templateUrl: './change-infos.component.html',
  styleUrls: ['./change-infos.component.scss']
})
export class ChangeInfosComponent implements OnInit {

  changeForm: UntypedFormGroup;

  public promotions = [
    {value: 'P17', viewValue: 'P17'},
    {value: 'P18', viewValue: 'P18'},
    {value: 'P19', viewValue: 'P19'},
    {value: 'P20', viewValue: 'P20'},
    {value: 'P21', viewValue: 'P21'},
    {value: 'P22', viewValue: 'P22'},
    {value: 'ISUP17', viewValue: 'ISUP17'},
    {value: 'ISUP18', viewValue: 'ISUP18'},
    {value: 'ISUP19', viewValue: 'ISUP19'},
    {value: 'ISUP20', viewValue: 'ISUP20'},
    {value: 'ISUP21', viewValue: 'ISUP21'},
    {value: 'ISUP22', viewValue: 'ISUP22'},
    {value: 'Corps', viewValue: "Corps des Mines"},
    {value: 'None', viewValue: 'Aucun'},
  ]

  promoToLog = new Map<string, string>(
    [["P17", "17"],
    ["P18", "18"],
    ["P19", "19"],
    ["P20", "20"],
    ["P21", "21"],
    ["P22", "22"],
    ["ISUP17", "i17"],
    ["ISUP18", "i18"],
    ["ISUP19", "i19"],
    ["ISUP20", "i20"],
    ["ISUP21", "i21"],
    ["ISUP22", "i22"],
    ["Corps", "COR"],
    ['None', "EXT"]])

  public acceptCharte = false;
  public login : string;
  public promotion : string;

  token : string;

  compte : Account | undefined;
  accountSub : Subscription;

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private account: AccountService,
              private popup: PopupService,
              private auth : AuthService) { }



  ngOnInit() {

    this.changeForm = this.formBuilder.group({
      prenom: [null],
      nom: [null],
      email: [null, [Validators.email]],
      emailBis: [null, [Validators.email]],
      promotion : [null,],
      password : [null, [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      passwordBis : [null, ],
    });

    this.compte = this.account.compte$.value;
    this.token = this.auth.token!;

    this.accountSub = this.account.compte$.subscribe(
      (compte) => {
        this.promotion = compte!.promo;
        this.login = compte!.login;
      }
    )

    this.popup.loading$.next(false);
  }

  onChangePromotion() {
    this.promotion = this.changeForm.get('promotion')?.value;
  }

  onChangeInfos() {
    var newInfos : any = {};
    this.popup.loading$.next(true);
    newInfos.prenom = this.changeForm.get('prenom')!.value;
    newInfos.nom = this.changeForm.get('nom')!.value;

    newInfos.email = this.changeForm.get('email')!.value;
    const emailBis = this.changeForm.get('emailBis')!.value;
    if (this.changeForm.get('password')) {
      newInfos.password = this.changeForm.get('password')!.value;
      const passwordBis = this.changeForm.get('passwordBis')!.value;
      if (newInfos.password != passwordBis) {
        this.popup.loading$.next(false);
        this.popup.state$.next([false, "Les mots de passe ne correspondent pas !"]);
      }
    }

    if (newInfos.email != emailBis) { // Les emails ne correspondent pas, on renvoie une erreur
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Les emails ne correspondent pas !"]);
    }

    else {
      newInfos.token = this.auth.token;
      this.account.modifyAccount(this.login, newInfos, true)
        .then(() => {
          this.popup.loading$.next(false);
          this.popup.state$.next([true, "Compte modifié !"]);
          this.router.navigate(['/default']);
        })
        .catch((error) => {
          // this.popup.loading$.next(false);
          // this.popup.state$.next([false, error.error.message]);
          this.popup.loading$.next(false);
          this.popup.state$.next([false, "Erreur, le compte n'a pas pu être modifié merci réessayer et de contacter un administrateur si l'erreur se reproduit."]);
          this.router.navigate(['/account/modify']);

        }
      );
    }
  }
}
