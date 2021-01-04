import {Component} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {PatientService} from './services/api/patient.service';
import {DoctorService} from './services/api/doctor.service';
import {PatientModel} from './model/patient.model';
import {DoctorModel} from './model/doctor.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedPatient: PatientModel = {};
  loggedDoctor: DoctorModel = {};
  title = 'mmf-app';

  constructor(private auth: AuthService,
              private patientService: PatientService,
              private doctorService: DoctorService) {

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

  logout() {
    this.auth.logout();
  }
}
