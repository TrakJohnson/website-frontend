import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/place.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit{
  pixelA = {color: "red"}
  pixelB = {color: "blue"}
  placeGrid = [[this.pixelA, this.pixelB]];

  serverUpdateInterval: any;

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.updateGrid();
    this.serverUpdateInterval = setInterval(()=>{this.updateGrid()}, 2*1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.serverUpdateInterval);
  }

  updateGrid(){
    this.placeService.updateGrid().then((response) =>{
      //console.log(response)
      this.placeGrid = response.grid;
      console.log(this.placeGrid)
    })
  }
}
