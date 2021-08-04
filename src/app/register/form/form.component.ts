import { Component, OnInit } from '@angular/core';
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
    {value: 'None', viewValue: 'Aucun'},
  ]

  public acceptCharte = false;
  public login : string;
  public password : string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private account: AccountService,
              private popup: PopupService,) { }


  matchPassword(control: AbstractControl): ValidationErrors | null {

    const password = this.registerForm.get("password")!.value;
    const confirm = this.registerForm.get("passwordBis")!.value;
  
  
    if (password != confirm) { return { 'noMatch': true } }
  
    return null
  
  }
  
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
    var nom_processed = nom.toLowerCase().replaceAll('\'', "").replaceAll(" ", "_");
    this.login = prenom + '.' + nom_processed;
    const promotion = this.registerForm.get('promotion')!.value;
    const email = this.registerForm.get('email')!.value;
    const emailBis = this.registerForm.get('emailBis')!.value;
    const password = this.registerForm.get('password')!.value;
    const passwordBis = this.registerForm.get('passwordBis')!.value;
    if (email != emailBis) { // Les emails ne correspondent pas, on renvoie une erreur
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Les emails ne correspondent pas !"]);
    } 
    else if (password != passwordBis) {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Les mots de passe ne correspondent pas !"]);
    }
    
    else {
      // this.password = this.account.createPassword();
      this.account.createAccount(prenom, nom, this.login, this.password, email, promotion)
        .then((response) => {
          this.popup.loading$.next(false);
          this.popup.state$.next([true, "Compte créé !"]);
          this.router.navigate(['/register/infos', {login: response.loginAssigned, password : this.password}] , {skipLocationChange : true, replaceUrl: false}); 
        })
        .catch((error) => {
          this.popup.loading$.next(false);
          this.popup.state$.next([false, error.error.message]);
        }
      );
    }
  }
}
