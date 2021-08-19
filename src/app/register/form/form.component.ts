import { Component, OnInit, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  registerForm: FormGroup;

  public ecole = "";
  public ecoles = [
    {value: 'Mines', viewValue: 'Mines'},
    {value: 'Autre', viewValue: 'Autre'},
  ];

  public promotion = "";
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

  promoToLog = new Map<String, String>(
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
  public password : string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private account: AccountService,
              private popup: PopupService,) { }


  
  ngOnInit() {
    this.popup.loading$.next(true);

    this.registerForm = this.formBuilder.group({
      prenom: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      emailBis: [null, [Validators.required, Validators.email]],
      promotion : [null, [Validators.required]],
      password : [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      passwordBis : [null, [Validators.required],],
    });
    
    this.popup.loading$.next(false);
  }
  

  

  updateAcceptCharte() {
    this.acceptCharte = !this.acceptCharte;
  }

  onChangeEcole() { 
    this.ecole = this.registerForm.get('ecole')!.value;  
  }

  onCreateAccount() {
    this.popup.loading$.next(true);
    const prenom = this.registerForm.get('prenom')!.value;
    const nom = this.registerForm.get('nom')!.value;
    var nom_processed = nom.toLowerCase().replaceAll('\'', "").replaceAll(" ", "_").substring(0, 8);
    const promotion = this.registerForm.get('promotion')!.value;


    this.login = this.promoToLog.get(promotion) + nom_processed;


    const email = this.registerForm.get('email')!.value;
    const emailBis = this.registerForm.get('emailBis')!.value;
    this.password = this.registerForm.get('password')!.value;
    const passwordBis = this.registerForm.get('passwordBis')!.value;
    if (email != emailBis) { // Les emails ne correspondent pas, on renvoie une erreur
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Les emails ne correspondent pas !"]);
    } 
    else if (this.password != passwordBis) {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Les mots de passe ne correspondent pas !"]);
    }
    
    else {
      this.account.createAccount(prenom, nom, this.login, this.password, email, promotion)
        .then((response) => {
          this.popup.loading$.next(false);
          this.popup.state$.next([true, "Compte créé !"]);
          this.router.navigate(['/register/infos', {login: response.loginAssigned}] , {skipLocationChange : true, replaceUrl: false}); 
        })
        .catch((error) => {
          // this.popup.loading$.next(false);
          // this.popup.state$.next([false, error.error.message]);
          this.popup.loading$.next(false);
          this.popup.state$.next([false, "Erreur, le compte n'a pas pu être créé merci réessayer et de contacter un administrateur si l'erreur se reproduit."]);
          this.router.navigate(['/register/']); 
        
        }
      );
    }
  }
}
