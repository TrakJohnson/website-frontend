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

            this.http.get<[Event]>(
            environment.apiUrl + '/api/event/getAllEvents')
            .subscribe(
                (eventData : Array<any>) => {
                  console.log({"successEvents " : eventData});
                  var eventsTreated : any = {};
                  eventData.forEach(event => {
                    eventsTreated[event.id_event] = new Event(event);
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


}