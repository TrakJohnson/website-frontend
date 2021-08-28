import { Member } from "./member.model";

export class Pole {
    pole_id : number;
    name : string;
    description : string;  
    color : string;
    members : Array<Member>;

    constructor(data: any | undefined) {
      this.pole_id = data.pole_id || undefined;
      this.name = data.name || undefined;
      this.description = data.description || undefined;
      this.color = data.color;
      this.members = data.members || undefined;
    }
}