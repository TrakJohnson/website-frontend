import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { Account, authData } from '../models/account.model';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { PopupService } from './popup.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isAuth$ = new BehaviorSubject<boolean>(false);
    token: string | null;
    admin$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient,
                private popup: PopupService,
                private compteService: AccountService) {}

    login(login: string, password: string) {
        return new Promise<void>((resolve, reject) => {
            
            var password_encr =  CryptoJS.SHA3(password, { outputLength: 512 }).toString(CryptoJS.enc.Hex);
            console.log({password_encr : password_encr});

            this.http.post<authData>(
            environment.apiUrl + '/api/user/login',
            {login: login, password: password_encr })
            .subscribe(
                (authData) => {
                  console.log({"success " : authData})
                  this.token = authData.token;
                  localStorage.setItem('token', this.token)
                  this.compteService.compte$.next(authData.compte);
                  // console.log({leCompte : this.compteService.compte$.value});
                  if (this.compteService.compte$.value?.email_verified == 0){
                    this.popup.state$.next([false, "Merci de penser à vérifier votre adresse mail !"]);
                    this.admin$.next(authData.compte.admin);
                    this.isAuth$.next(true);
                    resolve();
                  }
                  else {
                    this.popup.state$.next([true, "Login successful !"]);
                    this.admin$.next(authData.compte.admin);
                    this.isAuth$.next(true);
                    resolve();
                  }
                  
                  
                },  
                (error) => {  
                  reject(error);
                }
            );
        });
    }

  loginFromToken(token : string | null) {
    return new Promise<void>((resolve, reject) => {
 
      this.http.post<authData>(
      environment.apiUrl + '/api/user/loginFromToken',
      {token : token})
      .subscribe(
          (authData) => {
            console.log({"success " : authData})
            this.token = authData.token;
            localStorage.setItem('token', this.token)
            this.compteService.compte$.next(authData.compte);
            console.log({leCompte : this.compteService.compte$.value});
            
            this.admin$.next(authData.compte.admin);
            this.isAuth$.next(true);
            resolve();
          },  
          (error) => {
            this.token  = null;  
            localStorage.removeItem('token') //pour n'avoir le message qu'une fois on retire le token
            this.popup.state$.next([false, "Votre compte à expiré."]);
            reject(error);
          }
      );
    });
  }
  

  logout() {
    this.isAuth$.next(false);
    this.admin$.next(false);
    this.token = null;
    localStorage.removeItem('token');
  }    

}          
                  