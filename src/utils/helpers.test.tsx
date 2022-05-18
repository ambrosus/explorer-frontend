import { TransactionProps } from '../pages/Addresses/AddressDetails/address-details.interface';
import {
  calcTime,
  sliceData5,
  sliceData10,
  toUniqueValueByBlock,
} from './helpers';

describe('sliceData5 & sliceData10', () => {
  it('should slice data less then correctly value', () => {
    const data = '0x0';
    expect(sliceData10(data)).toEqual('0x0');
    expect(sliceData5(data)).toEqual('0x0');
  });
  it('if empty string | null | undefined', () => {
    const dEmpty = '';
    const dNull = null;
    const dUndefined = undefined;
    expect(sliceData10(dEmpty)).toEqual('');
    expect(sliceData10(dNull)).toEqual('');
    expect(sliceData10(dUndefined)).toEqual('');
    expect(sliceData5(dEmpty)).toEqual('');
    expect(sliceData5(dNull)).toEqual('');
    expect(sliceData5(dUndefined)).toEqual('');
  });
  it('should slice data correctly value', () => {
    const address = '0xB500558a3886e42142121B54c4bd1ef378D34';
    expect(sliceData10(address)).toEqual('0xB500558a...d1ef378D34');
    expect(sliceData5(address)).toEqual('0xB50...78D34');
    expect(sliceData10(address)).toMatchSnapshot();
  });
});

describe('calcTime', () => {
  it('Invalid date', () => {
    const tNull = null;
    const tUndefined = undefined;
    const tEmptyString = '';

    expect(calcTime(tNull)).toEqual('');
    expect(calcTime(tUndefined)).toEqual('Invalid date');
    expect(calcTime(tEmptyString)).toEqual('');
  });
  it('a few seconds ago', () => {
    const time = Date.now() / 1000;
    expect(calcTime(time)).toEqual('a few seconds ago');
    expect(calcTime(time)).not.toEqual('');
    expect(calcTime(time)).not.toEqual('Invalid date');
    expect(calcTime(time)).toMatchSnapshot();
  });
  it('a minute ago', () => {
    const time = Date.now() / 1000 - 60;
    expect(calcTime(time)).toEqual('a minute ago');
    expect(calcTime(time)).not.toEqual('');
    expect(calcTime(time)).not.toEqual('Invalid date');
  });
  it('an hour ago', () => {
    const time = Date.now() / 1000 - 60 * 60;
    expect(calcTime(time)).toEqual('an hour ago');
    expect(calcTime(time)).not.toEqual('');
    expect(calcTime(time)).not.toEqual('Invalid date');
  });
  it('a two hour ago', () => {
    const time = Date.now() / 1000 - 60 * 60 * 2;
    expect(calcTime(time)).toEqual('2 hours ago');
    expect(calcTime(time)).not.toEqual('');
    expect(calcTime(time)).not.toEqual('Invalid date');
  });
  it('12 hours ago', () => {
    const time = Date.now() / 1000 - 60 * 60 * 12;
    expect(calcTime(time)).toEqual('12 hours ago');
    expect(calcTime(time)).not.toEqual('');
    expect(calcTime(time)).not.toEqual('Invalid date');
  });
  it('a day ago', () => {
    const time = Date.now() / 1000 - 60 * 60 * 24;
    expect(calcTime(time)).toEqual('a day ago');
    expect(calcTime(time)).not.toEqual('');
    expect(calcTime(time)).not.toEqual('Invalid date');
  });
  it('7 days ago', () => {
    const time = Date.now() / 1000 - 60 * 60 * 24 * 7;
    expect(calcTime(time)).toEqual('7 days ago');
    expect(calcTime(time)).not.toEqual('');
    expect(calcTime(time)).not.toEqual('Invalid date');
  });
  it('a month ago', () => {
    const time = Date.now() / 1000 - 60 * 60 * 24 * 30;
    expect(calcTime(time)).toEqual('a month ago');
    expect(calcTime(time)).not.toEqual('');
    expect(calcTime(time)).not.toEqual('Invalid date');
  });
  it('a year ago', () => {
    const time = Date.now() / 1000 - 60 * 60 * 24 * 365;
    expect(calcTime(time)).toEqual('a year ago');
    expect(calcTime(time)).not.toEqual('');
    expect(calcTime(time)).not.toEqual('Invalid date');
  });
});

// test toUniqueValueByBlock

describe('toUniqueValueByBlock', () => {
  it('should return unique value', () => {
    const data = [
      {
        hash: 1,
        block: 1,
        value: '0xB500558a3886e42142121B54c4bd1ef378D34',
      },
    ];
    const data2 = [
      {
        hash: 1,
        block: 1,
        value: '0xB500558a3886e42142121B54c4bd1ef378D34',
      },
      {
        hash: 2,
        block: 2,
        value: '0xB500558a3886e42142121B54c4bd1ef378D34',
      },
    ];
    expect(toUniqueValueByBlock([...data, ...data2])).toEqual([
      { block: 2, hash: 2, value: '0xB500558a3886e42142121B54c4bd1ef378D34' },
      { block: 1, hash: 1, value: '0xB500558a3886e42142121B54c4bd1ef378D34' },
    ]);
  });

  it('Negative checking cases', () => {
    const notValidObjects = [undefined, null, [], {}, 'string', 1];
    for (let int = 1; int < notValidObjects.length; int++) {
      expect(toUniqueValueByBlock(notValidObjects[int])).toMatchObject(
        notValidObjects[int] || notValidObjects || [],
      );
    }
  });
});
