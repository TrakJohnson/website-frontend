import {Place} from "./place.model";

export class Event {
  public event_id: number;
  title: string;
  description: string;
  dateEvent: Date;
  dateEvent_end: Date | undefined;
  event_place: string;
  pole_id: string;
  login_creator: string;
  date_open: Date | undefined;
  date_close: Date | undefined;
  num_places: number | undefined;
  cost_contributor: number | undefined;
  cost_non_contributor: number | undefined;
  points: number | undefined;
  on_sale: boolean;
  is_billetterie: boolean;
  thumbnail: string;
  placesClaimed: Place[];

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

  static getEventMonthStrLong(event : Event) {
    let monthInd = new Date(event.dateEvent).getMonth();
    let monthStr = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    return monthStr[monthInd];
  }

  static getEventMonthDate(event : Event) : number {
    let d = new Date(event.dateEvent);
    return d.getDate();
  }

  static getEventMonthDateStr(event : Event) : string {
    let num = new Date(event.dateEvent).getDate();
    if (num == 1) {
      return '1er'
    } else {
      return `${num}`
    }
  }

  static getEventStrDay(event : Event) : string {
    let d = new Date(event.dateEvent);
    return ["lundi", "mardi", "mercedi", "jeudi", "vendredi", "samedi", "dimanche"][d.getDay()];
  }


}
