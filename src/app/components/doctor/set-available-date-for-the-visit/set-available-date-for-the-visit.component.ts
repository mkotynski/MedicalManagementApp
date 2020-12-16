import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {isSameDay, isSameMonth} from 'date-fns';
import {AvailableDateModel} from '../../../model/available-date.model';
import {VisitTypeModel} from '../../../model/visit-type.model';
import {DoctorModel} from '../../../model/doctor.model';
import {PatientModel} from '../../../model/patient.model';
import {MedicalVisitModel} from '../../../model/medical-visit.model';
import {AvailableDateService} from '../../../services/available-date.service';
import {DateManagerService} from '../../../services/date-manager.service';
import {PatientService} from '../../../services/patient.service';
import {DoctorService} from '../../../services/doctor.service';
import {MedicalVisitService} from '../../../services/medical-visit.service';
import {RepeatablePeriod} from '../../../enum/repeatable-period.enum';
import {VisitDurationTime} from '../../../enum/visit-duration-time.enum';


@Component({
  selector: 'app-set-available-date-for-the-visit',
  templateUrl: './set-available-date-for-the-visit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./set-available-date-for-the-visit.component.scss']
})
export class SetAvailableDateForTheVisitComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  doctorId;
  medicalVisit: MedicalVisitModel = {};
  activeDayIsOpen = false;
  visitTypeModel: VisitTypeModel = {};
  doctor: DoctorModel = {};
  patient: PatientModel = {};
  events$: Observable<CalendarEvent<{ availableDateModel: AvailableDateModel }>[]>;
  refresh: Subject<any> = new Subject();
  availableDate: AvailableDateModel = { };


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

    this.doctorService.find(1).subscribe(data => {
      this.doctor = data.body;
      this.availableDate = { doctor: this.doctor};
    });
    this.patientService.find(1).subscribe(data => {
      this.patient = data.body;
    });
  }

  fetchEvents(): void {
    this.events$ = this.availableDateService.findAllByDoctorId(1);
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


  openDialog(date: Date): void {
    this.availableDate.date = date;
    const dialogRef = this.dialog.open(AddNewAvailableDateDialogComponent, {
      width: '350px',
      data:
        {
          availableDate: this.availableDate
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.save(result.availableDate);
    });
  }

  save(availableDateModel: AvailableDateModel){
    console.log(availableDateModel);
    this.availableDateService.create(availableDateModel).subscribe(data => {
      this.showOperationsSuccessfulToast();
    }, error => {
      this.showOperationErrorToast();
    });
    //this.availableDate = {};
    this.availableDate = { doctor: this.doctor};
  }

  eventHourSegmentClicked(date: Date): void {
    this.openDialog(date);
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }


  showOperationsSuccessfulToast() {
    this.toastrService.show('TEXTS.OPERATION_END_SUCCESSFUL', 'Title');
  }

  showOperationErrorToast() {
    this.toastrService.show('TEXTS.OPERATION_END_WITH_ERROR', 'Title');
  }

  eventClicked(event: CalendarEvent<any>) {

  }
}

interface DialogData {
  availableDate: AvailableDateModel;
}


@Component({
  selector: 'app-add-new-available-date-dialog',
  templateUrl: 'add-new-available-date-dialog.component.html',
})
export class AddNewAvailableDateDialogComponent implements OnInit {
  visitTypes: VisitTypeModel[];
  enumKeys = [];
  repeatablePeriods = RepeatablePeriod;
  durationKeys = [];
  visitDurationTime = VisitDurationTime;
  constructor(
    public dialogRef: MatDialogRef<AddNewAvailableDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dateManager: DateManagerService) {
    this.enumKeys = Object.keys(RepeatablePeriod).filter(f => !isNaN(Number(f)));
    this.durationKeys = Object.keys(VisitDurationTime).filter(f => !isNaN(Number(f)));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }
}
