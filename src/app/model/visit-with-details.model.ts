import {MedicalVisitModel} from './medical-visit.model';
import {RecipeModel} from './recipe.model';
import {ReferenceModel} from './reference.model';
import {ReceiptModel} from './receipt.model';

export class VisitWithDetailsModel {
  medicalVisit?: MedicalVisitModel;
  recipes?: RecipeModel[];
  references?: ReferenceModel[];
  receipt?: ReceiptModel;
}
