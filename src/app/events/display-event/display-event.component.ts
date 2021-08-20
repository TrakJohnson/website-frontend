import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.scss']
})
export class DisplayEventComponent implements OnInit {

  constructor() { }

  @Input()
  event : Event;
  @Input()
  poles : any;

  ngOnInit(): void {
    console.log({eventReceived : this.event});
    console.log({polesReceived : this.poles});
  }

}
