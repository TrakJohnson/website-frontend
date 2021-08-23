import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventQuickviewComponent } from './event-quickview.component';

describe('EventQuickviewComponent', () => {
  let component: EventQuickviewComponent;
  let fixture: ComponentFixture<EventQuickviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventQuickviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventQuickviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
