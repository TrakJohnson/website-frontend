import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsFeedComponent } from './events-feed.component';
import { EventService } from 'src/app/services/events.service'; // Ajustez le chemin si nécessaire
import { of } from 'rxjs';
import { Event } from 'src/app/models/event.model';

describe('EventsFeedComponent', () => {
  let component: EventsFeedComponent;
  let fixture: ComponentFixture<EventsFeedComponent>;
  let mockEventService: jasmine.SpyObj<EventService>;

  beforeEach(async () => {
    mockEventService = jasmine.createSpyObj('EventService', ['getEvents']);

    await TestBed.configureTestingModule({
      declarations: [ EventsFeedComponent ],
      providers: [
        { provide: EventService, useValue: mockEventService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load events on initialization', async () => {
    const mockEvents: Event[] = [
      new Event({
        title: 'Test Event',
        description: 'Test Description',
        dateEvent: new Date(),
        event_place: 'Test Place',
        thumbnail: ''
      })
    ];

    mockEventService.getEvents.and.returnValue(Promise.resolve(mockEvents));
    await component.ngOnInit();
    expect(component.events.length).toBe(1);
    expect(component.events[0].title).toBe('Test Event');
  });
});
