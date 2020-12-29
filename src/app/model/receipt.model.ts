import {DoctorModel} from './doctor.model';
import {PatientModel} from './patient.model';
import {ReceiptStatus} from '../enum/receipt-status.enum';
import {ReceiptPositionModel} from './receipt-position.model';
import {MedicalVisitModel} from './medical-visit.model';

export class ReceiptModel {
  id?: number;
  code?: string;
  visit?: MedicalVisitModel;
  doctor?: DoctorModel;
  patient?: PatientModel;
  date?: Date;
  expirationDate?: Date;
  receiptStatus?: ReceiptStatus;
  positions?: ReceiptPositionModel[];
}
