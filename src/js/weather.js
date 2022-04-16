const openWeatherUrl = 'http://api.openweathermap.org/';
const oneCallEndpoint = 'data/2.5/onecall?';
const OWApiKey = '&APPID=c3f37a8f85bd36886ebfe021ad796145';

const getWeatherIcon = async (iconCode, sizeFactor) => {
  const iconUrl = 'http://openweathermap.org/img/wn/';
  const iconAPI = `${iconUrl}${iconCode}@${sizeFactor}x.png`;
  const response = await fetch(iconAPI, { mode: 'cors' });

  return response.url;
};

const getWeatherData = async (lat, lon) => {
  const oneCallQuery = `lat=${lat}&lon=${lon}`;
  const oneCallUrl = `${openWeatherUrl}${oneCallEndpoint}${oneCallQuery}${OWApiKey}`;
  const response = await fetch(oneCallUrl, { mode: 'cors' });
  const json = await response.json();

  return json;
};

export { getWeatherIcon, getWeatherData };
