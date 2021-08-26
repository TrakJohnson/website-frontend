import { Place } from "./place.model";

export class Event {
    public event_id : number ;
    title : string;  
    description : string;
    dateEvent: Date;
    dateEvent_end : Date|undefined;
    event_place: string;
    pole_id: string;
    login_creator: string;
    date_open: Date|undefined;
    date_close: Date|undefined;
    num_places: number|undefined;
    cost_contributor: number|undefined;
    cost_non_contributor: number|undefined;
    points: number|undefined;
    on_sale: boolean;
    is_billetterie : boolean;
    thumbnail : string;
    placesClaimed : Place[];

    constructor(data: any | undefined) {
        this.event_id = data.event_id || undefined;
        this.title = data.title || undefined;
        this.description = data.description || undefined;
        this.dateEvent = data.dateEvent || undefined;
        this.dateEvent_end = data.dateEvent_end || undefined;
        this.event_place = data.event_place || undefined;
        this.pole_id = data.pole_id || undefined;
        this.login_creator = data.login_creator || false;
        this.date_open = data.date_open;
        this.date_close = data.date_close || undefined;
        this.num_places = data.num_places || undefined;
        this.cost_contributor = data.cost_contributor || undefined;
        this.cost_non_contributor = data.cost_non_contributor || undefined;
        this.points = data.points || undefined;
        this.on_sale = data.on_sale || undefined;
        this.is_billetterie = data.is_billetterie || undefined;
        this.thumbnail = data.thumbnail || undefined;
        this.placesClaimed = data.placesClaimed || [];
      }
}  