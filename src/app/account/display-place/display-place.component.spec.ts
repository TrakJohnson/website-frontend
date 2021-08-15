import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPlaceComponent } from './display-place.component';

describe('DisplayPlaceComponent', () => {
  let component: DisplayPlaceComponent;
  let fixture: ComponentFixture<DisplayPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
