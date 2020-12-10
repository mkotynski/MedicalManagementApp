import {SpecializationModel} from './specialization.model';

export class DoctorModel {
  id?: number;
  name?: string;
  surname?: string;
  specializationType?: SpecializationModel;
  dateOfEmployment?: string;
}
