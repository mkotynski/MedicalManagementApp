import {DoctorModel} from './doctor.model';
import {PatientModel} from './patient.model';
import {VisitTypeModel} from './visit-type.model';
import {VisitStatus} from '../enum/visit-status.enum';

export class MedicalVisitModel {
  id?: number;
  name?: string;
  date?: Date;
  endDate?: Date;
  done?: boolean;
  time?: string;
  visitType?: VisitTypeModel;
  visitStatus?: VisitStatus;
  description?: string;
  doctor?: DoctorModel;
  patient?: PatientModel;

}
