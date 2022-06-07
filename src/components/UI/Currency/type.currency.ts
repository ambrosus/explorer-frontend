import { INumber } from '../interfaces/number.interface';

export interface ICurrency extends INumber {
  symbol?: string;
  side?: 'left' | 'right';
}
