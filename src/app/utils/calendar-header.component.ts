import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  template: `
    <div class="row text-center">
      <div class="col-md-4">
        <div class="btn-group">
          <div
            class="btn btn-primary"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            Poprzedni
          </div>
          <div
            class="btn btn-outline-secondary"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            Dziś
          </div>
          <div
            class="btn btn-primary"
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            Następny
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</h3>
      </div>
      <div class="col-md-4">
        <div class="btn-group">
          <div
            class="btn btn-primary"
            (click)="viewChange.emit('month')"
            [class.active]="view === 'month'">
            Miesiąc
          </div>
          <div
            class="btn btn-primary"
            (click)="viewChange.emit('week')"
            [class.active]="view === 'week'">
            Tydzień
          </div>
          <div
            class="btn btn-primary"
            (click)="viewChange.emit('day')"
            [class.active]="view === 'day'">
            Dzień
          </div>
        </div>
      </div>
    </div>
    <br>
  `
})
export class CalendarHeaderComponent {
  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale: string = 'pl';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
