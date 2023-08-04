import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlaceGrid } from '../models/place-grid.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  updateGrid(){
    return new Promise<PlaceGrid>((resolve, reject) => {
      this.http.get<PlaceGrid>(environment.apiUrl+'/api/r/meuh')
        .subscribe((data : PlaceGrid) => {
          //console.log(data)
          resolve(data);
        },
        (error) => {
          reject(error);
        })
    });
  }
}
