import {Component, OnInit} from '@angular/core';
import {DoctorModel} from '../../../model/doctor.model';
import {DoctorService} from '../../../services/api/doctor.service';
import {SpecializationTypeService} from '../../../services/api/specialization-type.service';
import {SpecializationModel} from '../../../model/specialization.model';

@Component({
    selector: 'app-registration-for-an-appointment',
    templateUrl: './registration-for-an-appointment.component.html',
    styleUrls: ['./registration-for-an-appointment.component.scss']
})
export class RegistrationForAnAppointmentComponent implements OnInit {
    doctors: DoctorModel[];
    doctorsToshow: DoctorModel[];
    specializations: SpecializationModel[];
    spec: SpecializationModel = {};
    lackOfSpec: SpecializationModel = {id: 0, name: 'Wszystkie specjalizacje'};

    constructor(private doctorService: DoctorService,
                private specializationTypeService: SpecializationTypeService) {
    }

    ngOnInit(): void {
        this.spec = this.lackOfSpec;
        this.doctorService.query().subscribe(data => {
            this.doctorsToshow = this.doctors = data.body;
        });
        this.specializationTypeService.query().subscribe(data => {
            this.specializations = data.body;
            this.specializations.push(this.lackOfSpec);
        });
    }

    filterBySpec() {
        if (this.spec.name != null) {
            if (this.spec.id === 0) {
                this.doctorsToshow = this.doctors;
            } else {
                this.doctorsToshow = this.doctors.filter(doctor => doctor.specializationType.name === this.spec.name);
            }
        }
    }
}
