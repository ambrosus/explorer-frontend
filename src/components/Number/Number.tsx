import { numWithCommas } from '../../utils/helpers';
import { INumber } from '../UI/interfaces/number.interface';
import React from 'react';

function round(input: any, precision: any) {
  const [number, exponent] = input.toString().split('.');

  if (exponent) {
    input = `0.${exponent}`;
  }

  let [unit, mantissa] = `${input}e`.split('e');

  let rounded: any = Math.round(+`${unit}e${Number(mantissa) + precision}`);
  [unit, mantissa] = `${rounded}e`.split('e');

  rounded = Number(`${unit}e${Number(mantissa) - precision}`);

  if (exponent) {
    [unit, mantissa] = rounded.toString().split('.');
    rounded = `${Number(unit) >= 1 ? Number(number) + Number(unit) : number}${
      precision > 0 ? '.' : ''
    }${mantissa || Array(precision).fill('0').join('')}`;
  } else {
    rounded += `.${Array(precision).fill('0').join('')}`;
  }

  return rounded;
}

const _Number = React.forwardRef((props: INumber, ref: any) => {
  const { className, value, fixed, delimiter, discharge, ...other } = props;
  const diffValue = +value - Math.trunc(+value);

  const number =
    typeof fixed === 'number'
      ? round(value, diffValue === 0 ? 2 : fixed)
      : value;

  const classes = `inherit ${className}`;
  const [unit, mantissa]: any = String(number).split('.');

  return (
    <span className={classes} {...other} ref={ref}>
      <span className={classes}>{numWithCommas(unit)}</span>
      {mantissa && fixed !== 0 && (
        <span className={classes}>
          {(delimiter && delimiter.decimals) || '.'}
          {mantissa}
        </span>
      )}
      <span className={classes}>&nbsp; {discharge}</span>
    </span>
  );
});

export default _Number;
