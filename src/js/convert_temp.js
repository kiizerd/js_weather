const convertTemp = (temp, srcUnit) => {
  switch (srcUnit) {
    case 'K':
      return (temp - 273.15).toFixed(2);
    case 'C':
      return (temp * (9 / 5) + 32).toFixed(2);
    case 'F':
      return ((temp - 32) * (5 / 9)).toFixed(2);
    default:
      return temp;
  }
};

export default convertTemp;
