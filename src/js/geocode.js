const openWeatherGeoCodeUrl = 'https://api.openweathermap.org/geo/1.0/direct?';
const OWApiKey = 'c3f37a8f85bd36886ebfe021ad796145';

const forwardGeocodeQuery = async (query) => {
  const openWeatherGeoQuery = `${openWeatherGeoCodeUrl}q=${query}&limit=5`;
  const openWeatherGeoAPI = `${openWeatherGeoQuery}&appid=${OWApiKey}`;
  const response = await fetch(openWeatherGeoAPI, { mode: 'cors' });
  const json = await response.json();

  return json;
};

export default forwardGeocodeQuery;
