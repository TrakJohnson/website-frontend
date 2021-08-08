import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../models/account.model';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { nodeModuleNameResolver } from 'typescript';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class AccountService {


    compte$ = new BehaviorSubject<Account | undefined>(undefined);

    constructor(private http: HttpClient) {}

    createAccount(prenom: string, nom : string, login: string, password: string, email : string, promotion: string) {
        var password_encr =  CryptoJS.SHA3(password, { outputLength: 512 }).toString(CryptoJS.enc.Hex);
        console.log({"login": login, "password": password_encr});
        return new Promise<any>((resolve, reject) => {
            this.http.post(
            environment.apiUrl + '/api/user/register',
            {prenom : prenom, nom: nom,  loginAccountCreated: login, password: password_encr, email : email, admin : false, contributor : false, promotion : promotion})
            .subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    console.log({error : error})
                    reject(error);
                }
            );
        });
    }   

    createAccountFromAdmin(prenom: string, nom : string, login: string, password: string, email : string, demandT1 : boolean, demandT2 : boolean, demandT3 : boolean, isMineur: boolean, promotion: string, paiement : string,  chambre: string) {
        var password_encr =  CryptoJS.SHA3(password, { outputLength: 512 }).toString(CryptoJS.enc.Hex);
        console.log({"login": login, "password": password_encr});
        return new Promise<any>((resolve, reject) => {
            this.http.post(
            environment.apiUrl +'/api/admin/createAccount',
            {loginSender: this.compte$.value!.login, prenom : prenom, nom: nom,  loginAccountCreated: login, password: password_encr, T1 : demandT1, T2 : demandT2, T3 : demandT3, email : email, promotion : promotion, typePaiement : paiement, chambre : chambre })
            .subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    console.log({error : error})
                    reject(error);
                }
            );
        });
    }   

    getAccount() {
        console.log("bienvenue");
        return new Promise<Account>((resolve, reject) => {
            this.http.post(
                environment.apiUrl +'/api/resident/', {loginSender : this.compte$.value!.login})
            .subscribe(
                (compte : any) => {
                    console.log({CompteReceived: compte});
                    resolve(compte.compte);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    };

    getDemandedPlacesStatus() {
        return new Promise<Account>((resolve, reject) => {
            this.http.post(
                environment.apiUrl +'/api/event/getDemandedPlacesStatus', {loginSender : this.compte$.value!.login})
            .subscribe(
                (places : any) => {
                    console.log({placesReceived: places});
                    resolve(places);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    pwdLen = 10;

    createPassword() {
        return Array(this.pwdLen).fill(this.pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('')
    }

    // const newRequest = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    //   });

    changePasswordAccount(token: string, newPassword: string) {
        /* On doit mettre des headers particuliers dans cette fonction, c'est unique dans tout le site (avec la fonction verifyEmail, plus bas).
        Normalement quand on veut faire authentifier un token dans le site c'est pour un compte, on peut donc utiliser l'interceptor.
        Cependant ici le token ne sert pas le même but, il faut donc le faire "à la main", c'est à dire en donnant des options à la requête HTTP */
        var newPassword_encr =  CryptoJS.SHA3(newPassword, { outputLength: 512 }).toString(CryptoJS.enc.Hex);
        return new Promise<void>((resolve, reject) => {
            this.http.post(
            environment.apiUrl +'/api/recover/change',
            {token : 'bearer ' + token, newPassword : newPassword_encr})
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
    
    demandSendEmailRecoverPassword(login: string, email: string) {
        return new Promise<void>((resolve, reject) => {
            this.http.post(
            environment.apiUrl +'/api/recover/demand',
            {loginToChangePassword : login, emailAdressToSend : email})
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    verifyEmail(token: string) {
        /* On doit mettre des headers particuliers dans cette fonction, c'est unique dans tout le site (avec la fonction changePasswordAccount, plus haut).
        Normalement quand on veut faire authentifier un token dans le site c'est pour un compte, on peut donc utiliser l'interceptor.
        Cependant ici le token ne sert pas le même but, il faut donc le faire "à la main", c'est à dire en donnant des options à la requête HTTP */

        return new Promise<void>((resolve, reject) => {
            this.http.post(
            environment.apiUrl +'/api/resident/verify',
            {token : 'bearer ' + token})
            .subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }


    disconnect() {
        this.compte$.next(undefined);
    }

}     