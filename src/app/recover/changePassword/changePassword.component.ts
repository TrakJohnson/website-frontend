import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";
import { AuthService } from "src/app/services/auth.service";
import { PopupService } from "src/app/services/popup.service";


@Component({ selector: 'app-changePassword',
templateUrl: './changePassword.component.html',
styleUrls: ['./changePassword.component.scss']
 })
export class ChangePasswordComponent implements OnInit {

  changePWDForm: UntypedFormGroup;

  public password : string;

  private token : string;

  constructor(private formBuilder: UntypedFormBuilder,
              private auth : AuthService,
              private router : Router,
              private route : ActivatedRoute,
              private popup: PopupService,
              private account : AccountService
              ) { }

  ngOnInit() {
    this.popup.loading$.next(true);

    this.token = this.route.snapshot.params["token"];

    this.changePWDForm = this.formBuilder.group({
      password : [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      passwordBis : [null, [Validators.required],],
    });
    
    this.popup.loading$.next(false);
  }


  onChangePassword() {
    this.popup.loading$.next(true);
   
    
    this.password = this.changePWDForm.get('password')!.value;
    const passwordBis = this.changePWDForm.get('passwordBis')!.value;

    if (this.password != passwordBis) {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Les mots de passe ne correspondent pas !"]);
    }
    
    else {
      this.account.changePasswordAccount(this.token, this.password)
        .then((response) => {
          this.popup.loading$.next(false);
          this.popup.state$.next([true, "Le mot de passe a bien été changé"]);
          this.router.navigate(['/login']); 
        })
        .catch((error) => {
          this.popup.loading$.next(false);
          this.popup.state$.next([false, "Erreur, le mot de passe n'a pas pu être changé, merci réessayer et de contacter un administrateur si l'erreur se reproduit."]);
          this.router.navigate(['/recover/change-password/'+ this.token]); 
        
        }
      );
    }
  }
}
