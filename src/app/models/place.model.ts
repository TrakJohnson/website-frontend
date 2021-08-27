export class Place {
    public event_id : number;
    login : string;
    user_points : number  
    status: number;
    payed: boolean;

    constructor(data: any | undefined) {
        this.event_id = data.event_id || undefined;
        this.login = data.login || undefined;
        this.user_points = data.user_points || undefined;
        this.status = data.status || undefined;
        this.payed = data.payed || undefined;
    }
}  