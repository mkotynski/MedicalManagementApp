import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {MedicalVisitModel} from '../../model/medical-visit.model';
import {ToastrService} from 'ngx-toastr';
import {MedicalVisitService} from '../../services/medical-visit.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  medicalVisits: MedicalVisitModel[];
  refresh: Subject<any> = new Subject();

  visit: MedicalVisitModel = {date: new Date(2020, 11, 10, 10, 10, 10)};

  events$: Observable<CalendarEvent<{ medicalVisit: MedicalVisitModel }>[]>;

  constructor(private medicalVisitService: MedicalVisitService,
              private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  getTimezoneOffsetString(date: Date): string {
    const timezoneOffset = date.getTimezoneOffset();
    const hoursOffset = String(
      Math.floor(Math.abs(timezoneOffset / 60))
    ).padStart(2, '0');
    const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
    const direction = timezoneOffset > 0 ? '-' : '+';

    return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
  }

  fetchEvents(): void {
    this.events$ = this.medicalVisitService.findAllByPatientId(1);
  }

  showOperationsSuccessfulToast() {
    this.toasterService.show('TEXTS.OPERATION_END_SUCCESSFUL', 'Title');
  }

  showOperationErrorToast() {
    this.toasterService.show('TEXTS.OPERATION_END_WITH_ERROR', 'Title');
  }
}
