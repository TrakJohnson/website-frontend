import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Event } from "../models/event.model";
import { Pole } from "../models/pole.model";


@Injectable({
providedIn: 'root'
})
export class PoleService {

    constructor(private http: HttpClient) {}

    poles$ = new BehaviorSubject<any>({});

    getPoles() {
        console.log("coucou");
        return new Promise<any>((resolve, reject) => {

            this.http.get<any>(
            environment.apiUrl + '/api/pole/getPoles')
            .subscribe(
                (polesData : Array<any>) => {
                  console.log({"polesSent " : polesData});
                  var polesTreated : any = {};
                  polesData.forEach(pole => {
                    polesTreated[pole.pole_id] = new Pole(pole);
                  });
                  console.log({"polesTreated " : polesTreated});
                  this.poles$.next(polesTreated);
                  resolve(polesData);
                },  
                (error) => {  
                  reject(error);
                }
            );
        });
    }


    PoleToID = new Map([["Bureau" , 1], [ 
      "Pôle Alternatif" , 2], [
      "Pôle Classique" , 3], [
      "Pôle Ciné" , 4], [
      "Pôle Comédie Musicale" , 5], [
      "Pôle Sorties/Expos/Arts du spectacle" , 6], [
      "Pôle Culinaire" , 7], [
      "Pôle Jam-Jazz" , 8], [
      "Pôle Littérature" , 9], [
      "Pôle Opéra/Ballet" , 10], [
      "Pôle Théâtre" , 11], [
      "Pôle Salle Ins/Salle Piano" , 12], [
      "Pôle Radio" , 13], [
      "Pôle Rap" , 14], [
      "Pôle Mode" , 15], [
      "Pôle Stand-up" , 16], [
      "Pôle Comm'" , 17], [
      "Pôle RSI" , 18]]);


      IDToPole = new Map([[1,"Bureau"],[2,"Pôle Alternatif"],[3,"Pôle Classique"],[4,"Pôle Ciné"],[5,"Pôle Comédie Musicale"],[6,"Pôle Sorties/Expos/Arts du spectacle"],[7,"Pôle Culinaire"],[8,"Pôle Jam-Jazz"],[9,"Pôle Littérature"],[10,"Pôle Opéra/Ballet"],[11,"Pôle Théâtre"],[12,"Pôle Salle Ins/Salle Piano"],[13,"Pôle Radio"],[14,"Pôle Rap"],[15,"Pôle Mode"],[16,"Pôle Stand-up"],[17,"Pôle Comm'"],[18,"Pôle RSI"]])


      PoleForView = [
        {value: '1', viewValue: 'Bureau'},
        {value: '2', viewValue: 'Pôle alternatif'},
        {value: '3', viewValue: 'Pôle classique'},
        {value: '4', viewValue: 'Pôle ciné'},
        {value: '5', viewValue: 'Pôle comédie musicale'},
        {value: '6', viewValue: 'Pôle Sorties/Expos/Arts du spectacle'},
        {value: '7', viewValue: 'Pôle culinaire'},
        {value: '8', viewValue: 'Pôle jam-jazz'},
        {value: '9', viewValue: 'Pôle littérature'},
        {value: '10', viewValue: 'Pôle opéra/ballet'},
        {value: '11', viewValue: 'Pôle théatre'},
        {value: '12', viewValue: 'Pôle salle ins/salle piano'},
        {value: '12', viewValue: 'Pôle radio'},
        {value: '14', viewValue: 'Pôle rap'},
        {value: '15', viewValue: 'Pôle mode'},
        {value: '16', viewValue: 'Pôle stand-up'},
        {value: '17', viewValue: 'Pôle Comm'},
        {value: '18', viewValue: 'RSI (on sait jamais)'},
        {value: '0', viewValue: 'Autre'},
      ]
}