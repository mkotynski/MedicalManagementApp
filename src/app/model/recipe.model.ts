import {DoctorModel} from './doctor.model';
import {PatientModel} from './patient.model';
import {RecipePositionModel} from './recipe-position.model';
import {MedicalVisitModel} from './medical-visit.model';

export class RecipeModel {
  id?: number;
  code?: string;
  visit?: MedicalVisitModel;
  doctor?: DoctorModel;
  patient?: PatientModel;
  date?: Date;
  expirationDate?: Date;
  positions?: RecipePositionModel[];
}
