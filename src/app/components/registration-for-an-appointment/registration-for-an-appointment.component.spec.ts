import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationForAnAppointmentComponent } from './registration-for-an-appointment.component';

describe('RegistrationForAnAppointmentComponent', () => {
  let component: RegistrationForAnAppointmentComponent;
  let fixture: ComponentFixture<RegistrationForAnAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationForAnAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationForAnAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
