import {DoctorModel} from './doctor.model';
import {PatientModel} from './patient.model';
import {VisitTypeModel} from './visit-type.model';

export class MedicalVisitModel {
  id?: number;
  name?: string;
  date?: Date;
  time?: string;
  visitType?: VisitTypeModel;
  description?: string;
  doctor?: DoctorModel;
  patient?: PatientModel;

}
