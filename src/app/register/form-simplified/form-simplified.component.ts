import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { AccountService } from '../../services/account.service';


const passwordEqualityValidator = (fg: FormGroup) => {
  const pw1 = fg.get('password')!.value;
  const pw2 = fg.get('passwordBis')!.value;
  return pw1 === pw2 ? null : { pwEq : true };
};


@Component({
  selector: 'app-form-simplified',
  templateUrl: './form-simplified.component.html',
  styleUrls: ['./form-simplified.component.scss']
})
export class FormSimplifiedComponent implements OnInit {

  registerFormSimplified: FormGroup;

  public loginPortailChecked : boolean = false;
  public prenom : string;
  public nom : string;
  public promotion : string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private account: AccountService,
              private popup: PopupService,) { }

  ngOnInit(): void {
    this.registerFormSimplified = this.formBuilder.group(
      {
        idPortail: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password : [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
        passwordBis : [null, [Validators.required]],
      }, {validator: passwordEqualityValidator}
    )
  }

  onValidateIdPortail() {
    let idPortail = this.registerFormSimplified.get('idPortail')!.value;
    this.account.getInfosFromPortail(idPortail)
      .then(resp => {
        this.loginPortailChecked = true;
        this.prenom = resp.prenom;
        this.nom = resp.nom;
        this.registerFormSimplified.controls.email.setValue(resp.email);
        this.promotion = resp.promotion;
      })
      .catch(err => this.popup.state$.next([false, err.error.message]))
  }

  onCreateAccount() {
    this.popup.loading$.next(true);

    const prenom = this.prenom;
    const nom = this.nom;
    const login = this.registerFormSimplified.get('idPortail')!.value;
    const password = this.registerFormSimplified.get('password')!.value;
    const email = this.registerFormSimplified.get('email')!.value;
    const promotion = this.promotion;

    this.account.createAccount(prenom, nom, login, password, email, promotion)
      .then((response) => {
        this.popup.loading$.next(false);
        this.router.navigate(
          ['/register/infos', {login: response.loginAssigned}] ,
          {skipLocationChange : true, replaceUrl: false}
        );
      })
      .catch((err) => {
        this.popup.loading$.next(false);
        this.popup.state$.next([false, err.error.message]);
        this.router.navigate(['/register/']);
      })
  }
}
