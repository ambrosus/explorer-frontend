import './Currency.scss';
import { ICurrency } from './type.currency';
import { Number } from 'components/Number';
import React from 'react';

const Currency = React.forwardRef((props: ICurrency, ref: any) => {
  const { className, symbol, value, fixed, side, delimiter, ...other } = props;

  const classes = `AMB-Currency ${className}`;

  const _symbol = symbol || '$';

  const diffValue = +value - Math.trunc(+value);

  return (
    <span className={classes}>
      {side === 'left' && (
        <span className="symbol left">
          {' '}
          &nbsp;
          {_symbol}
        </span>
      )}
      <Number
        {...other}
        value={value}
        fixed={diffValue === 0 ? 2 : fixed}
        delimiter={delimiter}
        ref={ref}
      />
      {side !== 'left' && (
        <span className="symbol right">{_symbol} &nbsp;</span>
      )}
    </span>
  );
});

export default Currency;
