import {DoctorModel} from './doctor.model';
import {PatientModel} from './patient.model';
import {RecipePositionModel} from './recipe-position.model';

export class ReferenceModel {
  id?: number;
  code?: string;
  doctor?: DoctorModel;
  patient?: PatientModel;
  date?: Date;
  expirationDate?: Date;
  referenceTo?: string;
  details?: string;
}
