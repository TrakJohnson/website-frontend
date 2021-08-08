import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
                  this.compteService.compte$.next(authData.compte);
                  // console.log({leCompte : this.compteService.compte$.value});
                  // this.admin$.next(authData.admin);
                  this.popup.state$.next([true, "Login successful !"]);

                  this.isAuth$.next(true);
                  resolve();
                },  
                (error) => {  
                  reject(error);
                }
            );
        });
    }

    adminLogin(login: string, password: string) {
      return new Promise<void>((resolve, reject) => {

          var password_encr =  CryptoJS.SHA3(password, { outputLength: 512 }).toString(CryptoJS.enc.Hex);
          this.http.post<authData>(
            environment.apiUrl + '/api/admin/login',
          {loginAdmin: login, password: password_encr})
          .subscribe(
              (authData) => {
                this.token = authData.token;
                this.compteService.compte$.next( new Account(authData.compte));
                this.admin$.next(authData.admin);
                if (authData.admin != true) {
                  const error = {error : "Vous n'avez pas les accès administrateur"};
                  reject(error);
                }
                this.isAuth$.next(true);
                resolve();
              },  
              (error) => {  
                reject(error);
              }
          );
      });
  }

  logout() {
    this.isAuth$.next(false);
    this.admin$.next(false);
    this.token = null;
  }    

}          
                  