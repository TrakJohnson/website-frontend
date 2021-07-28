export class Account {
    id : number;
    prenom : string;  
    nom : string;
    login: string;
    email: string;
    chambre: string;
    promotion: string;
    cotisant: boolean;
    compteVerifie: boolean;
    dateCreation: string;
    dateApprobation: string;
    isInRadius: boolean;

    constructor(data?: any | undefined) {
      this.prenom = data.prenom || undefined;
      this.nom = data.nom || undefined;
      this.login = data.login || undefined;
      this.email = data.email || undefined;
      this.chambre = data.chambre || undefined;
      this.promotion = data.promotion || undefined;
      this.cotisant = data.cotisant || false;
      this.compteVerifie = data.compteVerifie? data.compteVerifie:0;
      this.dateCreation = data.dateCreation || undefined;
      this.dateApprobation = data.dateApprobation || undefined;
      this.isInRadius = data.isInRadius? data.isInRadius:0;
    }
}

export class authData {
    compte : Account;
    admin : boolean;
    token : string;
}

