import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-pole',
  templateUrl: './displayPole.component.html',
  styleUrls: ['./displayPole.component.scss']
})
export class DisplayPoleComponent implements OnInit {
  
  constructor() { }

  @Input() pole : any[];
  @Input() pole_id : number;
  
  customCollapsedHeight : string = "20vh"
  customExpandedHeight : string = "90vh"
  panelOpenState : boolean;

  ngOnInit(): void {
    
  }

  currentlyOpenedItemIndex = -1;

  items = [{'header' : 'yo', 'description' : "coucou", 'content' : "waw"}];

  setOpened(itemIndex : any) {
    this.currentlyOpenedItemIndex = itemIndex;
  }

  setClosed(itemIndex:any) {
    if(this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }

}
