import { Component, Input, OnInit } from '@angular/core';
import { Pole } from 'src/app/models/pole.model';
import { PoleService } from 'src/app/services/poles.service';



@Component({
  selector: 'app-display-pole',
  templateUrl: './displayPole.component.html',
  styleUrls: ['./displayPole.component.scss']
})
export class DisplayPoleComponent implements OnInit {
  
  constructor(private poleServ : PoleService) { }

  @Input() pole : any[];
  @Input() pole_id : number;
  @Input() pole_infos : Pole;


  profile_height = 20;
  customCollapsedHeight : string = String(this.profile_height) + "vh"
  customExpandedHeight : string;
  panelOpenState : boolean;


  ngOnInit(): void {
    this.customExpandedHeight = String(this.profile_height * (this.pole.length+1)) +"vh";
  }

  currentlyOpenedItemIndex = -1;


  setOpened(itemIndex : any) {
    this.currentlyOpenedItemIndex = itemIndex;
  }

  setClosed(itemIndex:any) {
    if(this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }

}
