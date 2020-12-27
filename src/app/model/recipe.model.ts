import {DoctorModel} from './doctor.model';
import {PatientModel} from './patient.model';
import {ReceiptPositionModel} from './receipt-position.model';
import {RecipePositionModel} from './recipe-position.model';

export class RecipeModel {
  id?: number;
  code?: string;
  doctor?: DoctorModel;
  patient?: PatientModel;
  date?: Date;
  expirationDate?: Date;
  recipePositionSet?: RecipePositionModel[];
}
