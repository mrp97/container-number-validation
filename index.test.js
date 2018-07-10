import {
    error,
    isValid,
    splitContainerNumber,
    getCheckDigit,
    getContainerNumberWithoutCheckDigit,
    getNumericalValues,
    calculateCheckDigit,
    validation
} from './index';

describe('isValid', () => {
  it('Shoud match container number pattern', () => {
    expect(isValid('')).toBe(false);
    expect(isValid('dfsj7122007')).toBe(false);
    expect(isValid('dfsu7122007')).toBe(true);
    expect(isValid('cmau0902910')).toBe(true);

  });
});

describe('splitContainerNumber', () => {
  it('Should split container number to diffrent part', () => {
    expect(splitContainerNumber('')).toBe(error('invalidContainerNumber'));
    expect(splitContainerNumber('dfsu7162007')).toEqual({
      ownerCode: 'dfs',
      productGroupCode: 'u',
      registration: '716200',
      checkDigit: '7'
    });

    expect(splitContainerNumber('cmau0902910')).toEqual({
      ownerCode: 'cma',
      productGroupCode: 'u',
      registration: '090291',
      checkDigit: '0'
    });


  });
});

test('getCheckDigit', () => {
  expect(getCheckDigit('cmau0902910')).toBe(0);
});

test('getContainerNumberWithoutCheckDigit', ()=>{
  expect(getContainerNumberWithoutCheckDigit('dfsu7162007')).toBe('dfsu716200');
});

test('getNumericalValues', ()=>{
  expect(getNumericalValues('dfsu7162007')).toEqual([14,16,30,32,7,1,6,2,0,0]);
});

test('calculateCheckDigit', () => {
  expect(calculateCheckDigit('dfsu7162007')).toBe(7);
  expect(calculateCheckDigit('cmau0902910')).toBe(0);
  expect(calculateCheckDigit('cmau090291')).toBe(0);
  expect(calculateCheckDigit('dfsu716200')).toBe(7);



});

test('validation', () => {
  expect(validation('dfsu7162007').valid).toBe(true);
  expect(validation('dfsu7162008').valid).toBe(false);
  expect(validation('cmau0902910').valid).toBe(true);
});
