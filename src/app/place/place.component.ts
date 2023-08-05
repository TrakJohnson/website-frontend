import { Component, HostListener, OnInit } from '@angular/core';
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
  palette = [this.pixelA]

  currentX = -1;
  currentY = -1;
  currentColor = -1;

  //testColor = 'blue';

  serverUpdateInterval: any;

  constructor(private placeService: PlaceService,
              private popup: PopupService) {}

  ngOnInit(): void {
    this.placeService.getPalette().then((response)=>{
      this.palette = response.colors
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
      //console.log(this.palette)
      this.placeGrid = response.grid;
      //console.log(this.placeGrid)
    })
  }

  updatePixel(){
    console.log("updating pixel")
    this.placeService.updatePixel(this.currentX, this.currentY, this.currentColor)
      .then(()=>{
        this.updateGrid();
      })
  }

  blockSelected(event: any, x:number,y:number){
    console.log(x,y)
    console.log(event)
    this.currentX = x
    this.currentY = y
  }

  paletteSelect(c: number){
    this.currentColor = c;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.currentX != -1 && this.currentY != -1){
      switch(event.key){
        case 'z':
          this.currentY-=1;
          if(this.currentY < 0) this.currentY=0;
        break;
        case 's':
          this.currentY+=1;
          if(this.currentY >= this.placeGrid.length) this.currentY=this.placeGrid.length;
        break;
        case 'q':
          this.currentX-=1;
          if(this.currentX < 0) this.currentX=0;
        break;
        case 'd':
          this.currentX+=1;
          if(this.currentX >= this.placeGrid[0].length) this.currentX=this.placeGrid[0].length;
        break;
        case 'Enter':
          this.updatePixel()
        break;
      }
    }
  }
}
