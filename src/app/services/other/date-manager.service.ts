import {Injectable} from '@angular/core';
import {colors} from '../../utils/colors';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';

@Injectable({
  providedIn: 'root'
})
export class DateManagerService {


  constructor() {
  }

  parseDate(input) {
    const parts = input.match(/(\d+)/g);

    return new Date(parts[0], parts[1] - 1, parts[2], Number(parts[3])+1, parts[4], parts[5], parts[5]); // months are 0-based
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

  transform(dateOb: Date) {

    const date = ('0' + dateOb.getDate()).slice(-2);

    const month = ('0' + (dateOb.getMonth() + 1)).slice(-2);

    const year = dateOb.getFullYear();

    return (year + '-' + month + '-' + date);
  }

  transformDateTime(dateOb: Date) {
    const sec = ('0' + dateOb.getSeconds()).slice(-2);

    const min = ('0' + dateOb.getMinutes()).slice(-2);

    const hour = ('0' + dateOb.getHours()).slice(-2);

    const date = ('0' + dateOb.getDate()).slice(-2);

    const month = ('0' + (dateOb.getMonth() + 1)).slice(-2);

    const year = dateOb.getFullYear();

    return (year + '-' + month + '-' + date + ' ' + hour + ':' + min);
  }

  returnEventColor(reserved: boolean) {
    return reserved ? colors.red : colors.blue;
  }
}
