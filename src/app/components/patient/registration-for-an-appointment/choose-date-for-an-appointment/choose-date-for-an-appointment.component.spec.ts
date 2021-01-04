import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDateForAnAppointmentComponent } from './choose-date-for-an-appointment.component';

describe('ChooseDateForAnAppointmentComponent', () => {
  let component: ChooseDateForAnAppointmentComponent;
  let fixture: ComponentFixture<ChooseDateForAnAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseDateForAnAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDateForAnAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
