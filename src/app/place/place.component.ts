import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/place.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit{
  pixelA = {colorIndex:1, colorHex: "red"}
  pixelB = {colorHex: "blue"}
  placeGrid = [[this.pixelA]];
  palette = []

  //testColor = 'blue';

  serverUpdateInterval: any;

  constructor(private placeService: PlaceService,
              private popup: PopupService) {}

  ngOnInit(): void {
    this.placeService.getPalette().then((response)=>{
      this.palette = response
      this.popup.loading$.next(false);
    });
    this.updateGrid();
    this.serverUpdateInterval = setInterval(()=>{this.updateGrid()}, 2*1000);
    //this.popup.loading$.next(false); //loading popup disabled for now
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
