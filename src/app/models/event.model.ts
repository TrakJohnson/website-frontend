export class Event {
    id_event : number;
    title : string;  
    description : string;
    dateEvent: Date;
    event_place: string;
    id_pole: string;
    login_creator: string;
    date_open: Date;
    date_close: Date;
    num_places: number;
    cost_contributor: number;
    const_non_contributor: number;
    points: number;
    status: boolean;

    constructor(data?: any | undefined) {
        this.id_event = data.id_event || undefined;
        this.title = data.title || undefined;
        this.description = data.description || undefined;
        this.dateEvent = data.dateEvent || undefined;
        this.event_place = data.event_place || undefined;
        this.id_pole = data.id_pole || undefined;
        this.login_creator = data.login_creator || false;
        this.date_open = data.date_open;
        this.date_close = data.date_close || undefined;
        this.num_places = data.num_places || undefined;
        this.cost_contributor = data.cost_contributor || undefined;
        this.const_non_contributor = data.const_non_contributor || undefined;
        this.points = data.points || undefined;
        this.status = data.status || undefined;
      }

}  