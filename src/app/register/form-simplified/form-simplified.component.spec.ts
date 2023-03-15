import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSimplifiedComponent } from './form-simplified.component';

describe('FormSimplifiedComponent', () => {
  let component: FormSimplifiedComponent;
  let fixture: ComponentFixture<FormSimplifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSimplifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSimplifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
