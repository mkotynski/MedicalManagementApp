import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAvailableDateForTheVisitComponent } from './set-available-date-for-the-visit.component';

describe('RegistrationForAnAppointmentComponent', () => {
  let component: SetAvailableDateForTheVisitComponent;
  let fixture: ComponentFixture<SetAvailableDateForTheVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetAvailableDateForTheVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAvailableDateForTheVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
