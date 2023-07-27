import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Account} from '../models/account.model';
import {environment} from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import {Place} from '../models/place.model';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  compte$ = new BehaviorSubject<Account | undefined>(undefined);

  constructor(private http: HttpClient) {}

  createAccount(prenom: string, nom: string, login: string, password: string, email: string, promotion: string) {
    let password_encr = CryptoJS.SHA3(password, {outputLength: 512}).toString(CryptoJS.enc.Hex);
    return new Promise<any>((resolve, reject) => {
      this.http.post(
        environment.apiUrl + '/api/user/register',
        {
          prenom: prenom, nom: nom, loginAccountCreated: login, password: password_encr,
          email: email, admin: false, contributor: false, promotion: promotion
        }
      ).subscribe(resolve, reject)
    });
  }

  getInfosFromPortail(idPortail: string) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(
        environment.apiUrl + '/api/user/portailInfo',
        {idPortail: idPortail}
      ).subscribe(resolve, reject)
    })
  }

  getPlacesClaimedByUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.compte$.value?.login) {
        const params = new HttpParams().append('login', this.compte$.value?.login);
        this.http.get<Place[]>(
          environment.apiUrl + '/api/user/getPlacesClaimedByUser', {params})
          .subscribe(
            (places: Place[]) => {
              if (this.compte$.value) {
                this.compte$.next({...this.compte$.value, placesClaimed: places});
              }
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
      } else {
        reject({error: "Pas de compte existant"});
      }
    });
  }

  claimePlace(id_billetterie: number, size: number) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(
        environment.apiUrl + '/api/user/claimePlace',
        {id_billetterie: id_billetterie, size: size, login: this.compte$.value?.login})
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

  declaimePlace(id_billetterie: number) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(
        environment.apiUrl + '/api/user/declaimePlace',
        {id_billetterie: id_billetterie, login: this.compte$.value?.login})
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

  pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  pwdLen = 10;

  createPassword() {
    return Array(this.pwdLen).fill(this.pwdChars).map(function (x) {
      return x[Math.floor(Math.random() * x.length)]
    }).join('')
  }

  // const newRequest = req.clone({
  //     headers: req.headers.set('Authorization', 'Bearer ' + authToken)
  //   });

  changePasswordAccount(token: string, newPassword: string) {
    /* On doit mettre des headers particuliers dans cette fonction, c'est unique dans tout le site (avec la fonction verifyEmail, plus bas).
    Normalement quand on veut faire authentifier un token dans le site c'est pour un compte, on peut donc utiliser l'interceptor.
    Cependant ici le token ne sert pas le même but, il faut donc le faire "à la main", c'est à dire en donnant des options à la requête HTTP */
    var newPassword_encr = CryptoJS.SHA3(newPassword, {outputLength: 512}).toString(CryptoJS.enc.Hex);
    return new Promise<void>((resolve, reject) => {
      this.http.post(
        environment.apiUrl + '/api/recover/changePassword',
        {token: token, newPassword: newPassword_encr})
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

  modifyAccount(token: string, newInfos: any, sendEmail: boolean) {
    if (newInfos.password) newInfos.password = CryptoJS.SHA3(newInfos.password, {outputLength: 512}).toString(CryptoJS.enc.Hex)
    return new Promise<void>((resolve, reject) => {
      this.http.post(
        environment.apiUrl + '/api/user/changeInfos',
        {token: token, newInfos: newInfos, sendEmail: sendEmail})
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

  demandSendEmailChangePassword(login: string, email: string) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(
        environment.apiUrl + '/api/recover/demand',
        {loginToChangePassword: login, emailAdressToSend: email})
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
        environment.apiUrl + '/api/user/verify',
        {code: token})
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
