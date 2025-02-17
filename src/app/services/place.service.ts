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

  getPalette(){
    return new Promise<any>((resolve, reject)=>{
      this.http.get<any>(environment.apiUrl+'/api/r/meuh/palette')
        .subscribe((data: any)=> {
          console.log(data)
          resolve(data);
        },
        (error) => {
          reject(error);
        })
    });
  }

  updatePixel(x:number, y:number, color: number){
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(environment.apiUrl+'/api/r/meuh/requestPixelChange', {pixel: {x:x, y:y, colorIndex: color}})
        .subscribe((data: any) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        })
    });
  }
}
