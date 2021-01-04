import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../services/api/patient.service';
import {PatientModel} from '../../model/patient.model';
import {DoctorService} from '../../services/api/doctor.service';
import {AuthService} from '../../services/auth/auth.service';
import {DoctorModel} from '../../model/doctor.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedPatient: PatientModel = {};
  loggedDoctor: DoctorModel = {};
  constructor(private patientService: PatientService,
              private doctorService: DoctorService) {
  }

  ngOnInit(): void {
    if (AuthService.auth.roles.includes('patient')) {
      this.patientService.findLogged().subscribe(data => {
        this.loggedPatient = data.body;
      });
    } else if (AuthService.auth.roles.includes('doctor')) {
      this.doctorService.findLogged().subscribe(data => {
        this.loggedDoctor = data.body;
      });
    }
  }

}
