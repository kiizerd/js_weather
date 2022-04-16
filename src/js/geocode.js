const positionStackUrl = 'http://api.positionstack.com/v1/forward?';
const PSApiKey = 'access_key=d1815bb82d8ef2d2cc23e6843ef3e3a7';

const forwardGeocodeQuery = async (query) => {
  const positionStackAPI = `${positionStackUrl}${PSApiKey}`;
  const positionStackQuery = `${positionStackAPI}&query=${query}&limit=5`;
  const response = await fetch(positionStackQuery, { mode: 'cors' });
  const json = await response.json();

  return json;
};

export default forwardGeocodeQuery;
