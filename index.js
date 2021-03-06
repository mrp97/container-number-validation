const error = (error, arg) => {
  const messages = {
    invalidContainerNumber: 'Container number is invalid, example: dfsu7162007',
    incorrectCheckDigit: `Check Digit must be ${arg}`
  }
  return messages[error];
}

const isValid = (containerNumber) => {
  const pattern = /^[a-zA-Z]{3}[uU]{1}[0-9]{7}$/;
  return pattern.test(containerNumber);
};

const splitContainerNumber = (containerNumber) => {
  if(containerNumber.length == 10){
    containerNumber = containerNumber + '0';
  }
  
  if(!isValid(containerNumber)){
    return error('invalidContainerNumber');
  } else {
    const ownerCode = containerNumber.slice(0,3);
    const productGroupCode = containerNumber.slice(3,4);
    const registration = containerNumber.slice(4,10);
    const checkDigit = containerNumber.slice(10,11);

    return {
      ownerCode,
      productGroupCode,
      registration,
      checkDigit
    }
  }
}

const getCheckDigit = (containerNumber) => {
  return parseInt(splitContainerNumber(containerNumber).checkDigit);
}

const getContainerNumberWithoutCheckDigit = (containerNumber) => {
  if(!isValid(containerNumber)) {
    return error('invalidContainerNumber');
  } else {
    return containerNumber.slice(0,-1)
  }
}

const getNumericalValues = (containerNumber) => {

  if(containerNumber.length == 10){
    containerNumber = containerNumber + '0';
  }

  const alphabetNumerical = {
      'A' : 10, 'B' : 12, 'C' : 13, 'D' : 14, 'E' : 15,
      'F' : 16, 'G' : 17, 'H' : 18, 'I' : 19, 'J' : 20,
      'K' : 21, 'L' : 23, 'M' : 24, 'N' : 25, 'O' : 26,
      'P' : 27, 'Q' : 28, 'R' : 29, 'S' : 30, 'T' : 31,
      'U' : 32, 'V' : 34, 'W' : 35, 'X' : 36, 'Y' : 37,
      'Z' : 38
  }
  const numericalValues = [];
  const splitedCN = splitContainerNumber(containerNumber);

  return (
    numericalValues.concat(
      splitedCN.ownerCode.split('')
      .map(char => alphabetNumerical[char.toUpperCase()])
    ).concat(
      alphabetNumerical[splitedCN.productGroupCode.toUpperCase()]
    ).concat(
      splitedCN.registration.split('')
      .map(char => parseInt(char))
    )
  )
}

const calculateCheckDigit = (containerNumber) => {
  if(containerNumber.length == 10){
    containerNumber = containerNumber + '1';
  }
  const numericalValues = getNumericalValues(containerNumber);
  const numericalValuesSum = numericalValues.reduce((total,currentValue,currentIndex) => {
    return total + (currentValue * Math.pow(2,currentIndex));
  }, 0);
  return ( numericalValuesSum % 11 % 10);
}

const validation = (containerNumber) => {
  if(!isValid(containerNumber)){
    return { valid : false, error: error('invalidContainerNumber') };
  } else {
    const originalCheckDigit = getCheckDigit(containerNumber);
    const correctCheckDigit = calculateCheckDigit(containerNumber);
    if ( originalCheckDigit == correctCheckDigit ){
      return { valid: true };
    } else {
      return { valid: false, error: error('incorrectCheckDigit',correctCheckDigit) }
    }
  }

}

module.exports = {
  error: error,
  isValid: isValid,
  splitContainerNumber: splitContainerNumber,
  getCheckDigit: getCheckDigit,
  getContainerNumberWithoutCheckDigit: getContainerNumberWithoutCheckDigit,
  getNumericalValues: getNumericalValues,
  calculateCheckDigit: calculateCheckDigit,
  validation: validation,
}
