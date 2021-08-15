export class Member {
    prenom : string;
    nom : string;
    login : string;
    pole_id : number;
    role : string;
    promo : string;
    description : string;  

    constructor(data: any | undefined) {
      console.log({dataAcc : data});
      this.pole_id = data.prenom || undefined;
      this.nom = data.nom || undefined;
      this.login = data.login || undefined;
      this.pole_id = data.pole_id || undefined;
      this.role = data.role || undefined;
      this.promo = data.promo || undefined;
      this.description = data.description || undefined;
    }
}