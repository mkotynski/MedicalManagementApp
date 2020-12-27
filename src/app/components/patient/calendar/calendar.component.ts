import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {MedicalVisitModel} from '../../../model/medical-visit.model';
import {MedicalVisitService} from '../../../services/api/medical-visit.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  medicalVisits: MedicalVisitModel[];

  events$: Observable<CalendarEvent<{ medicalVisit: MedicalVisitModel }>[]>;

  constructor(private medicalVisitService: MedicalVisitService) {
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.events$ = this.medicalVisitService.findAllOfSubject();
  }

}
