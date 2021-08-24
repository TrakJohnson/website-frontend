import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({
providedIn: 'root'
})
export class ContactService {

    constructor(private http: HttpClient) {}

   

    sendMail(nom : string, email : string, sujet : string, contenu : string) {
        return new Promise<any[]>((resolve, reject) => {
            this.http.post(environment.apiUrl + '/api/contact/sendMail', {nom : nom, email : email, sujet : sujet, contenu : contenu})
            .subscribe(
                (response : any) => {
                    resolve(response);
                },
                (error) => {
                    console.log({error : error})
                    reject(error);
                }
            );
        });
    }


}