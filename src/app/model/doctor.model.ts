import {SpecializationModel} from './specialization.model';

export class DoctorModel {
  id?: number;
  name?: string;
  surname?: string;
  specialization?: SpecializationModel;
  dateOfEmployment?: string;
}
