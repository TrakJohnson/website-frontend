export class Place {
    public event_id : number;
    login : string;  
    status: number;
    payed: boolean;

    constructor(data: any | undefined) {
        console.log({data : data});
        this.event_id = data.event_id || undefined;
        this.login = data.login || undefined;
        this.status = data.status || undefined;
        this.payed = data.payed || undefined;
    }
}  