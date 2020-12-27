import {DoctorModel} from './doctor.model';
import {PatientModel} from './patient.model';
import {ReceiptStatus} from '../enum/receipt-status.enum';
import {ReceiptPositionModel} from './receipt-position.model';

export class ReceiptModel {
  id?: number;
  code?: string;
  doctor?: DoctorModel;
  patient?: PatientModel;
  date?: Date;
  expirationDate?: Date;
  receiptStatus?: ReceiptStatus;
  receiptPositionSet?: ReceiptPositionModel[];
}
