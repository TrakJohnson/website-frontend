import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Event} from '../../models/event.model';

@Component({
  selector: 'app-event-quickview',
  templateUrl: './event-quickview.component.html',
  styleUrls: ['./event-quickview.component.scss']
})
export class EventQuickviewComponent implements OnInit {

  constructor(private router: Router) {
  }

  @Input() event: Event;
  @Input() image: string;
  @Input() link: string;

  ngOnInit(): void {
    if (this.event.thumbnail == undefined || this.event.thumbnail.length < 1
      || this.event.thumbnail == null) {
      this.event.thumbnail = "../../../assets/img/dev/default_event_pic.jpg"
    }
  }

  getEventMonthStr(date : Date) : string {
    console.log(date)
    let d = new Date(date);
    let monthStr = [
      'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui',
      'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
    ];
    return (monthStr[d.getMonth()] + '.').toUpperCase();
  }

  getEventDay(date : Date) : number {
    console.log(date);
    let d = new Date(date);
    return d.getDate();
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }
}
