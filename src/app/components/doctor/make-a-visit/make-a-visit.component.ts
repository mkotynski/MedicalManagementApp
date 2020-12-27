import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {isSameDay, isSameMonth} from 'date-fns';
import {AvailableDateModel} from '../../../model/available-date.model';
import {VisitTypeModel} from '../../../model/visit-type.model';
import {DoctorModel} from '../../../model/doctor.model';
import {PatientModel} from '../../../model/patient.model';
import {MedicalVisitModel} from '../../../model/medical-visit.model';
import {AvailableDateService} from '../../../services/api/available-date.service';
import {DateManagerService} from '../../../services/other/date-manager.service';
import {PatientService} from '../../../services/api/patient.service';
import {DoctorService} from '../../../services/api/doctor.service';
import {MedicalVisitService} from '../../../services/api/medical-visit.service';
import {RepeatablePeriod} from '../../../enum/repeatable-period.enum';
import {VisitDurationTime} from '../../../enum/visit-duration-time.enum';
import {HttpClient} from '@angular/common/http';

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


  constructor(private toasterService: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private dateManager: DateManagerService,
              private medicalVisitService: MedicalVisitService,
              private patientService: PatientService,
              private doctorService: DoctorService,
  ) {
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
