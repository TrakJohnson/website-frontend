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
        return new Promise<void>((resolve, reject) => {

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
                  resolve();
                },  
                (error) => {  
                  reject(error);
                }
            );
        });
    }


}