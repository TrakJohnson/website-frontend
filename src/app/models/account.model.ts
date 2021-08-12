export class Account {
    id : number;
    prenom : string;  
    nom : string;
    login: string;
    email: string;
    emailVerified: string;
    contributor: boolean;
    admin: boolean;
    points: number;
    dateCreation: Date;
    dateLastCon: string;
    promo : string;
    placesDemanded : Array<any>;

    constructor(data: any | undefined) {
      console.log({dataAcc : data});
      this.id = data.id || undefined;
      this.prenom = data.prenom || undefined;
      this.nom = data.nom || undefined;
      this.login = data.login || undefined;
      this.email = data.email || undefined;
      this.emailVerified = data.email_verified || undefined;
      this.contributor = data.contributor || undefined;
      this.admin = data.admin || undefined;
      this.points = data.points;
      this.dateCreation = data.date_creation || undefined;
      this.dateLastCon = data.date_last_con || undefined;
      this.promo = data.promo || undefined;
      this.placesDemanded = data.placesDemanded || [];
    }
}

export class authData {
    compte : Account;
    admin : boolean;
    token : string;
}

