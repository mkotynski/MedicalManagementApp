import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalVisitComponent } from './medical-visit.component';

describe('AppointmentsComponent', () => {
  let component: MedicalVisitComponent;
  let fixture: ComponentFixture<MedicalVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
