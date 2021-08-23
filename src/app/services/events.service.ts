import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Event } from "../models/event.model";


@Injectable({
providedIn: 'root'
})
export class EventService {

    constructor(private http: HttpClient) {}

    events$ = new BehaviorSubject<any>({});

    getEvents() {
        return new Promise<void>((resolve, reject) => {

            this.http.get<any>(
            environment.apiUrl + '/api/event/getAllEvents')
            .subscribe(
                (eventData : Array<any>) => {
                  console.log({"successEvents " : eventData});
                  var eventsTreated : any = {};
                  eventData.forEach(event => {
                    eventsTreated[event.event_id] = new Event(event);
                  });
                  console.log({"successeventsTreatedEvents " : eventsTreated});
                  this.events$.next(eventsTreated);
                  resolve();
                },  
                (error) => {  
                  reject(error);
                }
            );
        });
    }

    getOneEvent(id : number){
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(
                environment.apiUrl + '/api/event/getOneEvent', {id : id})
                .subscribe(
                    (eventData : Array<any>) => {
                      console.log({"successEvent " : eventData});
                      
                      resolve(eventData);
                    },  
                    (error) => {  
                      reject(error);
                    }
                );
        })
    }

    getEventsTocome() {
      return new Promise<any[]>((resolve, reject) => {
          this.http.get(environment.apiUrl + '/api/event/getEventsTocome')
          .subscribe(
              (response : any) => {
                console.log(response)
                  resolve(response);
              },
              (error) => {
                  console.log({error : error})
                  reject(error);
              }
          );
      });
    } 

    getBilletteriesTocome() {
        return new Promise<any[]>((resolve, reject) => {
            this.http.get(environment.apiUrl + '/api/event/getBilletteriesTocome')
            .subscribe(
                (response : any) => {
                  console.log(response)
                    resolve(response);
                },
                (error) => {
                    console.log({error : error})
                    reject(error);
                }
            );
        });
    }
    
    closeBilletterie(id_billetterie : number) {
        return new Promise<void>((resolve, reject) => {
            this.http.post(environment.apiUrl + '/api/event/closeBilletterie', {id_billetterie : id_billetterie})
            .subscribe(
                (response : any) => {
                    console.log(response)
                    resolve(response);
                },
                (error) => {
                    console.log({error : error})
                    reject(error);
                }
            );
        });
    }

    reSaleBilletterie(id_billetterie : number) {
        return new Promise<void>((resolve, reject) => {
            this.http.post(environment.apiUrl + '/api/event/reSaleBilletterie', {id_billetterie : id_billetterie})
            .subscribe(
                (response : any) => {
                    console.log(response)
                    resolve(response);
                },
                (error) => {
                    console.log({error : error})
                    reject(error);
                }
            );
        });
    }

    givePlaceToUser(id_billetterie : number, loginToGivePlace : string) {
        return new Promise<void>((resolve, reject) => {
            this.http.post(environment.apiUrl + '/api/event/givePlaceToUser', {id_billetterie : id_billetterie, loginToGivePlace : loginToGivePlace})
            .subscribe(
                (response : any) => {
                    console.log(response)
                    resolve(response);
                },
                (error) => {
                    console.log({error : error})
                    reject(error);
                }
            );
        });
    }

    retirePlaceToUser(id_billetterie : number, loginToRetirePlace : string) {
        return new Promise<void>((resolve, reject) => {
            this.http.post(environment.apiUrl + '/api/event/retirePlaceToUser', {id_billetterie : id_billetterie, loginToRetirePlace : loginToRetirePlace})
            .subscribe(
                (response : any) => {
                    console.log(response)
                    resolve(response);
                },
                (error) => {
                    console.log({error : error})
                    reject(error);
                }
            );
        });
    }

    createEvent(titre : string, description : string, date : Date, lieu : string, image: string, idPole : number, createur : string, dateOuverture : Date, dateFermeture : Date, nPlaces : number, prixC : number, prixNC : number, points : number, is_billetterie : boolean) {
        return new Promise<any>((resolve, reject) => {
            this.http.post(
            environment.apiUrl + '/api/event/createEvent',
            {title : titre, description : description, dateEvent : date, event_place : lieu, thumbnail : image, pole_id : idPole, creator : createur, date_open : dateOuverture, date_close : dateFermeture, num_places : nPlaces, cost_contributor : prixC, cost_non_contributor : prixNC, points : points, is_billetterie : is_billetterie})
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

  modifyEvent(idBilletterie : Number, titre : string, description : string, date : Date, lieu : string, image : string, idPole : number, dateOuverture : Date, dateFermeture : Date, nPlaces : number, prixC : number, prixNC : number, points : number, sendMail : boolean) {
    return new Promise<any>((resolve, reject) => {
          this.http.post(
          environment.apiUrl + '/api/event/modifyEvent',
          {event_id : idBilletterie, title : titre, description : description, dateEvent : date, event_place : lieu, thumbnail : image, pole_id : idPole, date_open : dateOuverture, date_close : dateFermeture, num_places : nPlaces, cost_contributor : prixC, cost_non_contributor : prixNC, points : points, sendMail : sendMail})
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
          this.http.post(environment.apiUrl + '/api/event/deleteBilletterie', {event_id : idBilletterie})
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