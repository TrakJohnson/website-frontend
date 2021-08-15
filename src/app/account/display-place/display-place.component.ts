import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-display-place',
  templateUrl: './display-place.component.html',
  styleUrls: ['./display-place.component.scss']
})
export class DisplayPlaceComponent implements OnInit {

  constructor() { }

  @Input()
  place : any;
  @Input()
  event : Event;
  @Input()
  poles : any;

  ngOnInit(): void {
    console.log({placeReceived : this.place});
    console.log({eventReceived : this.event});
    console.log({polesReceived : this.poles});
  }

}
