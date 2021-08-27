import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
providedIn: 'root'
})
export class TeamService {

    constructor(private http: HttpClient) {}

   

    getTeamAllMembers() {
        return new Promise<any[]>((resolve, reject) => {
            this.http.get(environment.apiUrl + '/api/team/getMembers')
            .subscribe(
                (response : any) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }


}