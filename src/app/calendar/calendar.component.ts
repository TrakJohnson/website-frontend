import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Router } from '@angular/router';
import { EventService } from '../services/events.service';
import { PopupService } from '../services/popup.service';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { PoleService } from '../services/poles.service';



@Component({
  selector: 'app-calendar',
  // changeDetection: ChangeDetectionStrategy.OnPush,  JE NE SAIS PAS SI C'EST UTILE A TESTER
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {


  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();



  refresh: Subject<any> = new Subject();

 
  events : CalendarEvent[] = [];


  activeDayIsOpen: boolean = false;

  constructor(private router : Router,
              private eventService : EventService,
              private popup : PopupService,
              private poleService : PoleService) {}


  ngOnInit() {
    this.popup.loading$.next(true);

    this.eventService.getEventsForCalendar()
    .then((data) => {
      
      

      data.forEach((event)=> {

        var color = this.poleService.PolesColors.get(this.poleService.IDToPole.get(event.pole_id)!)!

        this.events.push({
          start : new Date(event.dateEvent),
          end : event.dateEvent_end ? new Date(event.dateEvent_end) : addHours(new Date(event.dateEvent), 1),
          title : event.title,
          
          color: {primary : color, secondary : "#a4cdf4"},
          id : event.event_id,

        });

      })
      
      this.refresh.next();
      this.popup.loading$.next(false);
    })
    .catch((error) => {
      this.popup.loading$.next(false);
      this.popup.state$.next([false, "Erreur lors du chargement des évènements"])
    })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }


  handleEvent(action: string, event: CalendarEvent): void {
    this.router.navigate(["events/display/" + event.id])
  }



  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}



// example

 // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     allDay: true,

  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
      
  //   },
  // ];


  // const colors: any = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#22202C',
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF',
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA',
//   },
// };