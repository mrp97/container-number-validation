import {
    hello,
    error,
    isValid,
    splitContainerNumber,
    getCheckDigit,
    getContainerNumberWithoutCheckDigit,
    getNumericalValues,
    calculateCheckDigit,
    validation
} from './App';

describe('isValid', () => {
  it('Shoud match container number pattern', () => {
    expect(isValid('')).toBe(false);
    expect(isValid('dfsj7122007')).toBe(false);
    expect(isValid('dfsu7122007')).toBe(true);
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
  });
});

test('getCheckDigit', () => {
  expect(getCheckDigit('dfsu7162007')).toBe(7);
});

test('getContainerNumberWithoutCheckDigit', ()=>{
  expect(getContainerNumberWithoutCheckDigit('dfsu7162007')).toBe('dfsu716200');
});

test('getNumericalValues', ()=>{
  expect(getNumericalValues('dfsu7162007')).toEqual([14,16,30,32,7,1,6,2,0,0]);
});

test('calculateCheckDigit', () => {
  expect(calculateCheckDigit('dfsu7162007')).toBe(7);
});

test('validation', () => {
  expect(validation('dfsu7162007').valid).toBe(true);
  expect(validation('dfsu7162008').valid).toBe(false);

});
