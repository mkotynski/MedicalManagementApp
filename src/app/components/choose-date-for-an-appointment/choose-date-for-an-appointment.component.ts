import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {isSameDay, isSameMonth} from 'date-fns';
import {AvailableDateModel} from '../../model/available-date.model';
import {AvailableDateService} from '../../services/available-date.service';
import {DateManagerService} from '../../services/date-manager.service';
import {MedicalVisitService} from '../../services/medical-visit.service';
import {MedicalVisitModel} from '../../model/medical-visit.model';
import {VisitTypeService} from '../../services/visit-type.service';
import {VisitTypeModel} from '../../model/visit-type.model';
import {DoctorService} from '../../services/doctor.service';
import {DoctorModel} from '../../model/doctor.model';
import {PatientService} from '../../services/patient.service';
import {PatientModel} from '../../model/patient.model';

@Component({
  selector: 'app-choose-date-for-an-appointment',
  templateUrl: './choose-date-for-an-appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./choose-date-for-an-appointment.component.css']
})
export class ChooseDateForAnAppointmentComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  doctorId;
  medicalVisit: MedicalVisitModel = {};
  activeDayIsOpen = false;
  visitTypeModel: VisitTypeModel = {};
  doctor: DoctorModel = {};
  patient: PatientModel = {};
  events$: Observable<CalendarEvent<{ availableDateModel: AvailableDateModel }>[]>;


  constructor(private availableDateService: AvailableDateService,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private dateManager: DateManagerService,
              private medicalVisitService: MedicalVisitService,
              private patientService: PatientService,
              private doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.doctorId = +this.route.snapshot.paramMap.get('id');
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.events$ = this.availableDateService.findAllByDoctorId(this.doctorId);
    this.doctorService.find(this.doctorId).subscribe(data => {
      this.doctor = data.body;
    });
    this.patientService.find(1).subscribe(data => {
      this.patient = data.body;
    });
  }

  dayClicked({
               date,
               events,
             }: {
    date: Date;
    events: CalendarEvent<{ availableDateModel: AvailableDateModel }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }


  openDialog(availableDateModel: AvailableDateModel): void {
    const dialogRef = this.dialog.open(ConfirmDateDialogComponent, {
      width: '350px',
      data:
        {
          availableDateModel,
          confirm: false,
          visitType: this.visitTypeModel
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.save(result.availableDateModel, result.confirm, result.visitType);
    });
  }

  save(availableDateModel: AvailableDateModel, confirmed: boolean, visitType: VisitTypeModel) {
    this.medicalVisit = {
      name: 'Visit#',
      date: availableDateModel.date,
      visitType,
      doctor: this.doctor,
      patient: this.patient
    };
    this.medicalVisitService.create(this.medicalVisit).subscribe(data => {
      this.showOperationsSuccessfulToast();
    }, error => {
      this.showOperationErrorToast();
    });
    availableDateModel.reserved = true;
    this.availableDateService.update(availableDateModel).subscribe(data => {
      this.showOperationsSuccessfulToast();
    }, error => {
      this.showOperationErrorToast();
    });
    this.fetchEvents();
  }

  eventClicked(event: CalendarEvent<{ availableDateModel: AvailableDateModel }>): void {
    this.openDialog(event.meta.availableDateModel);
    console.log(event.meta.availableDateModel);
  }

  showOperationsSuccessfulToast() {
    this.toastrService.show('TEXTS.OPERATION_END_SUCCESSFUL', 'Title');
  }

  showOperationErrorToast() {
    this.toastrService.show('TEXTS.OPERATION_END_WITH_ERROR', 'Title');
  }
}

interface DialogData {
  availableDateModel: AvailableDateModel;
  confirm: boolean;
  visitType: VisitTypeModel;
}


@Component({
  selector: 'app-confirm-date-dialog.component',
  templateUrl: 'confirm-date-dialog.component.html',
})
export class ConfirmDateDialogComponent implements OnInit {
  visitTypes: VisitTypeModel[];

  constructor(
    public dialogRef: MatDialogRef<ConfirmDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private visitTypeService: VisitTypeService,
    public dateManager: DateManagerService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(new Date(this.data.availableDateModel.date));
    this.visitTypeService.query().subscribe(data => {
      this.visitTypes = data.body;
    });
  }
}
