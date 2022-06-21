import './Currency.scss';
import {ICurrency} from './type.currency';
import {Number} from 'components/Number';
import React from 'react';

const Currency = React.forwardRef((props: ICurrency, ref: any) => {
  const {className, symbol, value, fixed, side, delimiter, ...other} = props;
  console.log('value', value);
  const classes = `AMB-Currency ${className}`;

  const _symbol = symbol || '$';

  return (
    <span className={classes}>

      {side === 'left' && <span className="symbol left">      &nbsp;
        {_symbol}</span>}
      <Number
        {...other}
        value={value}
        fixed={+value === 0 ? 2 : fixed}
        delimiter={delimiter}
        ref={ref}
      />
      {side !== 'left' && <span className="symbol right">{_symbol}      &nbsp;
</span>}
    </span>
  );
});

export default Currency;
