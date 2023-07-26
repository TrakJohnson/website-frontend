import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit,} from '@angular/core';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {Subject, Subscription} from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Router} from '@angular/router';
import {EventService} from '../../services/events.service';
import {PopupService} from '../../services/popup.service';
//import {CalendarEventActionsComponent} from 'angular-calendar/modules/common/calendar-event-actions.component';
import {PoleService} from '../../services/poles.service';
import {AccountService} from '../../services/account.service';


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

  polesSub: Subscription;
  poles: any = {};
  events: CalendarEvent[] = [];
  isAdmin: boolean | undefined = false;
  accountSub: Subscription;
  activeDayIsOpen: boolean = false;

  constructor(private router: Router,
              private eventService: EventService,
              private popup: PopupService,
              private poleService: PoleService,
              private acc: AccountService) {
  }


  async ngOnInit() {
    this.popup.loading$.next(true);

    this.polesSub = this.poleService.poles$.subscribe(
      dataPoles => {
        this.poles = dataPoles;
      }
    );

    await this.poleService.getPoles();

    this.accountSub = this.acc.compte$.subscribe(
      (status) => {
        this.isAdmin = status?.admin;
      })

    this.eventService.getEventsForCalendar()
      .then((data) => {
        data.forEach((event) => {
          // some poles have been removed, hence the check
          if (event.pole_id in this.poles) {
            var color = this.poles[event.pole_id].color;
            this.events.push({
              start: new Date(event.dateEvent),
              end: event.dateEvent_end ? new Date(event.dateEvent_end) : addHours(new Date(event.dateEvent), 1),
              title: event.title,
              color: {primary: color, secondary: "#a4cdf4"},
              id: event.event_id,
            });
          }
        })

        this.refresh.next();
        this.popup.loading$.next(false);
      })
      .catch((error) => {
        console.log(error);
        this.popup.loading$.next(false);
        this.popup.state$.next([false, "Erreur lors du chargement des évènements"])
      })
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || events.length === 0);
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

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
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
