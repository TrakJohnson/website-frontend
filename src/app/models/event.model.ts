export class Event {
    public event_id : number;
    title : string;  
    description : string;
    dateEvent: Date;
    event_place: string;
    pole_id: string;
    login_creator: string;
    date_open: Date;
    date_close: Date;
    num_places: number;
    cost_contributor: number;
    const_non_contributor: number;
    points: number;
    on_sale: boolean;
    is_billetterie : boolean;
    thumbnail : string;

    constructor(data: any | undefined) {
        console.log({data : data});
        this.event_id = data.event_id || undefined;
        this.title = data.title || undefined;
        this.description = data.description || undefined;
        this.dateEvent = data.dateEvent || undefined;
        this.event_place = data.event_place || undefined;
        this.pole_id = data.pole_id || undefined;
        this.login_creator = data.login_creator || false;
        this.date_open = data.date_open;
        this.date_close = data.date_close || undefined;
        this.num_places = data.num_places || undefined;
        this.cost_contributor = data.cost_contributor || undefined;
        this.const_non_contributor = data.const_non_contributor || undefined;
        this.points = data.points || undefined;
        this.on_sale = data.on_sale || undefined;
        this.is_billetterie = data.is_billetterie || undefined;
        this.thumbnail = data.thumbnail || undefined;
      }
}  