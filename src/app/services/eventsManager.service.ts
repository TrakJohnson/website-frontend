import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../models/user.model';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { nodeModuleNameResolver } from 'typescript';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {


    constructor(private http: HttpClient) {}

    getEventsTocome() {
        return new Promise<any[]>((resolve, reject) => {

            this.http.post(environment.apiUrl + 'events/getEventsTocome', {})
            .subscribe(
                (response : any) => {
                    resolve(response);
                },
                (error) => {
                    console.log({error : error})
                    reject(error);
                }
            );
        });
    }

    createBilletterie(titre : string, description : string, date : Date, lieu : string, idPole : number, createur : string, dateOuverture : Date, dateFermeture : Date, nPlaces : number, prixC : number, prixNC : number, points : number) {
        return new Promise<any>((resolve, reject) => {
            this.http.post(
            environment.apiUrl + '/api/events/createBilletterie',
            {titre : titre, description : description, date : date, lieu : lieu, idPole : idPole, createur : createur, dateOuverture : dateOuverture, dateFermeture : dateFermeture, nPlaces : nPlaces, prixC : prixC, prixNC : prixNC, points : points})
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


    modificationBilletterie(idBilletterie : Number, titre : string, description : string, date : Date, lieu : string, idPole : number, dateOuverture : Date, dateFermeture : Date, nPlaces : number, prixC : number, prixNC : number, points : number) {
        return new Promise<any>((resolve, reject) => {
            this.http.post(
            environment.apiUrl + '/api/event/modifyBilletterie',
            {idBilletterie : idBilletterie, titre : titre, description : description, date : date, lieu : lieu, idPole : idPole, dateOuverture : dateOuverture, dateFermeture : dateFermeture, nPlaces : nPlaces, prixC : prixC, prixNC : prixNC, points : points})
            .subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    console.log({error : error});
                    reject(error);
                }
            );
        });
    }

    deleteBilletterie(idBilletterie : number) {
        return new Promise<any>((resolve, reject) => {
            this.http.post(environment.apiUrl + '/api/event/deleteBilletterie', {idBilletterie : idBilletterie})
            .subscribe(
                (response) => {
                    resolve(response)
                },
                (error) => {
                    console.log({error : error});
                    reject(error);
                }
            );
        });
    }
    

}