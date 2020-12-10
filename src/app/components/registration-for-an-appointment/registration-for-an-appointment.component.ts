import { Component, OnInit } from '@angular/core';
import {DoctorModel} from '../../model/doctor.model';
import {DoctorService} from '../../services/doctor.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-registration-for-an-appointment',
  templateUrl: './registration-for-an-appointment.component.html',
  styleUrls: ['./registration-for-an-appointment.component.scss']
})
export class RegistrationForAnAppointmentComponent implements OnInit {
  doctors: DoctorModel[];

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.doctorService.query().subscribe(data => {
      this.doctors = data.body;
    });
  }

}
