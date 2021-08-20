import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-event-quickview',
  templateUrl: './event-quickview.component.html',
  styleUrls: ['./event-quickview.component.scss']
})
export class EventQuickviewComponent implements OnInit {

  constructor(private router : Router) { }

  @Input()
  event : Event;
  @Input() image : string;
  @Input() link : string;

  ngOnInit(): void {
  }


  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }

}
