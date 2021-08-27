import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilletterieFilterComponent } from './billetterie-filter.component';

describe('BilletterieFilterComponent', () => {
  let component: BilletterieFilterComponent;
  let fixture: ComponentFixture<BilletterieFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilletterieFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilletterieFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
