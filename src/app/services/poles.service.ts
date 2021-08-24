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

}