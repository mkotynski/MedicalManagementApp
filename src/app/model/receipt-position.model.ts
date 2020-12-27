import {ReceiptModel} from './receipt.model';

export class ReceiptPositionModel {
  id?: number;
  description?: string;
  value?: number;
  receipt?: ReceiptModel;
}
