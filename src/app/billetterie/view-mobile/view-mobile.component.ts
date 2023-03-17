import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-view-mobile',
  templateUrl: './view-mobile.component.html',
  styleUrls: ['./view-mobile.component.scss']
})
export class ViewMobileComponent implements OnInit {

  @Input()
  eventsToDisplay : Array<any>;
  currentEventIndex : number = 0;

  constructor() { }

  ngOnInit(): void {

  }

  onNextEvent() {
    if (this.currentEventIndex < this.eventsToDisplay.length - 1) {
      this.currentEventIndex += 1
    }
  }

  onPreviousEvent() {
    if (this.currentEventIndex > 0) {
      this.currentEventIndex -= 1
    }
  }

  onChangeEvent(i : number) {
    this.currentEventIndex = i;
  }
}
