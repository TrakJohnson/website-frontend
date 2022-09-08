import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterclassQuickviewComponent } from './masterclass-quickview.component';

describe('MasterclassQuickviewComponent', () => {
  let component: MasterclassQuickviewComponent;
  let fixture: ComponentFixture<MasterclassQuickviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterclassQuickviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterclassQuickviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
