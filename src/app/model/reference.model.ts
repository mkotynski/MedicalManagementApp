import {DoctorModel} from './doctor.model';
import {PatientModel} from './patient.model';
import {MedicalVisitModel} from './medical-visit.model';

export class ReferenceModel {
  id?: number;
  code?: string;
  visit?: MedicalVisitModel;
  doctor?: DoctorModel;
  patient?: PatientModel;
  date?: Date;
  expirationDate?: Date;
  referenceTo?: string;
  details?: string;
}
