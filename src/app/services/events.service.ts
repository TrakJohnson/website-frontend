import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Event } from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

  events$ = new BehaviorSubject<Event[]>([]);

  getEvents(): Promise<Event[]> {
    return new Promise<Event[]>((resolve, reject) => {
      this.http.get<Event[]>(environment.apiUrl + '/api/event/getAllEvents')
        .subscribe(
          (eventData: Event[]) => {
            const eventsTreated: Event[] = eventData.map(event => new Event(event));
            this.events$.next(eventsTreated);
            resolve(eventsTreated);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

    getOneEvent(event_id : number){
        const params = new HttpParams().append('event_id', event_id);
        return new Promise<Event>((resolve, reject) => {
            this.http.get<Event>(
                environment.apiUrl + '/api/event/getOneEvent', {params})
                .subscribe(
                    (eventData : Event) => {

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
                  resolve(response);
              },
              (error) => {
                  reject(error);
              }
          );
      });
    }

    getEventsForCalendar() {
        return new Promise<any[]>((resolve, reject) => {
            this.http.get(environment.apiUrl + '/api/event/getEventsForCalendar')
            .subscribe(
                (response : any) => {
                    resolve(response);
                },
                (error) => {
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
                    resolve(response);
                },
                (error) => {
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
                    resolve(response);
                },
                (error) => {
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
                    resolve(response);
                },
                (error) => {
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
                    resolve(response);
                },
                (error) => {
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
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    createEvent(titre : string, description : string, date : Date, date_end : Date | undefined, lieu : string, image: string, idPole : number, createur : string, dateOuverture : Date |undefined, dateFermeture : Date | undefined, nPlaces : number|undefined, prixC : number|undefined, prixNC : number|undefined, points : number |undefined, is_billetterie : boolean) {
        return new Promise<any>((resolve, reject) => {
            this.http.post(
            environment.apiUrl + '/api/event/createEvent',
            {title : titre, description : description, dateEvent : date, dateEvent_end : date_end, event_place : lieu, thumbnail : image, pole_id : idPole, loginSender : createur, date_open : dateOuverture, date_close : dateFermeture, num_places : nPlaces, cost_contributor : prixC, cost_non_contributor : prixNC, points : points, is_billetterie : is_billetterie})
            .subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

  modifyBilletterie(idBilletterie : Number, titre : string, description : string, date : Date, date_end : Date|undefined, lieu : string, image : string, idPole : number, dateOuverture : Date|undefined, dateFermeture : Date|undefined, nPlaces : number|undefined, prixC : number|undefined, prixNC : number|undefined, points : number |undefined, sendMail : boolean) {

    return new Promise<any>((resolve, reject) => {
          this.http.post(
          environment.apiUrl + '/api/event/modifyBilletterie',
          {event_id : idBilletterie, title : titre, description : description, dateEvent : date, dateEvent_end : date_end, event_place : lieu, thumbnail : image, pole_id : idPole, date_open : dateOuverture, date_close : dateFermeture, num_places : nPlaces, cost_contributor : prixC, cost_non_contributor : prixNC, points : points, sendMail : sendMail})
          .subscribe(
              (response) => {
                  resolve(response);
              },
              (error) => {
                  reject(error);
              }
          );
      });
  }


  modifyEvent(idBilletterie : Number, titre : string, description : string, date : Date, date_end : Date|undefined, lieu : string, image : string, idPole : number, dateOuverture : Date|undefined, dateFermeture : Date|undefined, nPlaces : number|undefined, prixC : number|undefined, prixNC : number|undefined, points : number |undefined, sendMail : boolean) {

    return new Promise<any>((resolve, reject) => {
          this.http.post(
          environment.apiUrl + '/api/event/modifyEvent',
          {event_id : idBilletterie, title : titre, description : description, dateEvent : date, dateEvent_end : date_end, event_place : lieu, thumbnail : image, pole_id : idPole, date_open : dateOuverture, date_close : dateFermeture, num_places : nPlaces, cost_contributor : prixC, cost_non_contributor : prixNC})
          .subscribe(
              (response) => {
                  resolve(response);
              },
              (error) => {
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
                  reject(error);
              }
          );
      });
  }

    deleteEvent(idEvent : number) {
        return new Promise<any>((resolve, reject) => {
            this.http.post(environment.apiUrl + '/api/event/deleteEvent', {event_id : idEvent})
            .subscribe(
                (response) => {
                    resolve(response)
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    getEmailsParticipants(logins : string[]) {
      return new Promise<any>((resolve, reject) => {
        this.http
          .post(environment.apiUrl + '/api/event/getEmailsBilletterie', {logins: logins})
          .subscribe(resolve, reject)
      })
    }

    satisfyRequirements(event: any, requirements : any) : boolean {
        var satisfy = true;
        return Object.keys(requirements).every(key => {
            var satisfyThisKey = false;
            var keyValues = requirements[key];
            const eventVal = event[key] as any;
            console.log({keyVals : keyValues, eventVal : eventVal, type : typeof eventVal});
            if (eventVal == undefined) {
                satisfy = false;
                return false;
            } else if (typeof eventVal == "string") {
                keyValues.forEach((value : string) => {
                    satisfyThisKey = (eventVal.toUpperCase().includes(value.toUpperCase())) || satisfyThisKey;
                });
            } else if (typeof eventVal == "number") {
                keyValues.forEach((value : number) => {
                    console.log({val : value});
                    satisfyThisKey = (eventVal == value) || satisfyThisKey;
                });
            } else if (typeof eventVal == "boolean") {
                keyValues.forEach((value : boolean) => {
                    satisfyThisKey = (eventVal == value) || satisfyThisKey;
                });
            } else {
                return false;
            }

            return satisfyThisKey;
        })
    }

    filterEvents(eventList : Event[], requirements : any, sortDate : boolean = false) : Event[] {
        var selectedEvents : Event[]= [];
        console.log({requirements: requirements, events : eventList});
        eventList.forEach((event) => {
            if (this.satisfyRequirements(event, requirements)) {
                selectedEvents.push(event);
            }
        });
        if (sortDate) {
          eventList.sort((a, b) => {
            let date_a = new Date(a.dateEvent);
            let date_b = new Date(b.dateEvent);
            return date_a.getTime() > date_b.getTime() ? 1 : -1;
          })
        }
        return selectedEvents;
    }

}
