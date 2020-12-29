import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarView, DAYS_OF_WEEK} from 'angular-calendar';
import {MatDialog} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {AvailableDateModel} from '../../../model/available-date.model';
import {VisitTypeModel} from '../../../model/visit-type.model';
import {DoctorModel} from '../../../model/doctor.model';
import {PatientModel} from '../../../model/patient.model';
import {MedicalVisitModel} from '../../../model/medical-visit.model';
import {DateManagerService} from '../../../services/other/date-manager.service';
import {PatientService} from '../../../services/api/patient.service';
import {DoctorService} from '../../../services/api/doctor.service';
import {MedicalVisitService} from '../../../services/api/medical-visit.service';

@Component({
  selector: 'app-make-a-visit',
  templateUrl: './make-a-visit.component.html',
  styleUrls: ['./make-a-visit.component.css']
})
export class MakeAVisitComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  doctorId;
  medicalVisit: MedicalVisitModel = {};
  activeDayIsOpen = false;
  visitTypeModel: VisitTypeModel = {};
  doctor: DoctorModel = {};
  patient: PatientModel = {};
  events$: Observable<CalendarEvent<{ medicalVisit: MedicalVisitModel }>[]>;
  refresh: Subject<any> = new Subject();
  availableDate: AvailableDateModel = {};

  locale: string = 'en';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  constructor(private toasterService: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private dateManager: DateManagerService,
              private medicalVisitService: MedicalVisitService,
              private patientService: PatientService,
              private doctorService: DoctorService) {
  }

  ngOnInit(): void {

    this.fetchEvents();

    this.doctorService.find(1).subscribe(data => {
      this.doctor = data.body;
      this.availableDate = {doctor: this.doctor};
    });

  }

  fetchEvents(): void {
    this.events$ = this.medicalVisitService.findAllOfSubject();
  }

  eventClicked(event: CalendarEvent<any>) {
    this.router.navigate(['./visit-form/' + event.meta.medicalVisit.id], {relativeTo: this.route});
  }

  showOperationsSuccessfulToast() {
    this.toasterService.show('TEXTS.OPERATION_END_SUCCESSFUL', 'Title');
  }

  showOperationErrorToast() {
    this.toasterService.show('TEXTS.OPERATION_END_WITH_ERROR', 'Title');
  }
}
