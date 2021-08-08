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

    constructor(data?: any | undefined) {
      this.id = data.id || undefined;
      this.prenom = data.prenom || undefined;
      this.nom = data.nom || undefined;
      this.login = data.login || undefined;
      this.email = data.email || undefined;
      this.emailVerified = data.emailVerified || undefined;
      this.contributor = data.contributor || undefined;
      this.admin = data.admin || undefined;
      this.points = data.points || false;
      this.dateCreation = data.dateCreation || undefined;
      this.dateLastCon = data.dateLastCon || undefined;
      this.promo = data.promo || undefined;
    }
}

export class authData {
    compte : Account;
    admin : boolean;
    token : string;
}

