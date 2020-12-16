import {RepeatablePeriod} from '../enum/repeatable-period.enum';
import {DoctorModel} from './doctor.model';
import {VisitDurationTime} from '../enum/visit-duration-time.enum';

export class AvailableDateModel {
  id?: number;
  date?: Date;
  endDate?: Date;
  duration?: VisitDurationTime;
  repeatable?: boolean;
  repeatablePeriod?: RepeatablePeriod;
  reserved?: boolean;
  doctor?: DoctorModel;
}
