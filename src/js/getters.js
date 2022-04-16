import { cardinalFromDegree } from 'cardinal-direction';
import convertTemp from './convert_temp';

const getDescriptionFromWeatherData = (descData) => {
  const descArray = descData.description.split(' ');
  const descTitlizedArray = descArray.map((string) => {
    const firstLetter = string[0].toUpperCase();
    const restOfLetters = string.slice(1, string.length);
    return firstLetter.concat(restOfLetters);
  });

  const titlizedDescription = descTitlizedArray.join(' ');

  return titlizedDescription;
};

const getTempsFromWeatherData = (tempData) => {
  const rawTemps = {
    current: tempData.current.temp,
    high: tempData.daily.temp.max,
    low: tempData.daily.temp.min,
    feelsLike: tempData.current.feels_like,
  };

  return Object.fromEntries(
    Object.keys(rawTemps).map((key) => {
      const temp = rawTemps[key];
      return [key, convertTemp(temp, 'K')];
    }),
  );
};

const getWindFromWeatherData = (windData) => {
  const speed = `${windData.wind_speed}m/s`;
  const direction = cardinalFromDegree(windData.wind_deg);

  return { speed, direction };
};

const getDetailsFromWeatherData = (detailData) => {
  const humidity = `${detailData.humidity}%`;
  const dewPoint = `${detailData.dew_point}`;
  const clouds = `${detailData.clouds}%`;
  const pressure = `${detailData.pressure} hPa`;
  const uvIndex = `${detailData.uvi}`;
  const visibility = `${detailData.visibility / 1000}KM`;

  return {
    humidity, dewPoint, clouds, pressure, uvIndex, visibility,
  };
};

const getDateTimeString = (date = false) => {
  let timeString = '';
  let dateString = '';
  if (date) {
    timeString = date.toLocaleTimeString();
    dateString = date.toString().split(' ').slice(0, 3).join(' ');
  } else {
    const newDate = new Date();
    timeString = newDate.toLocaleTimeString();
    dateString = newDate.toString().split(' ').slice(0, 3).join(' ');
  }

  return `${dateString}, ${timeString}`;
};

export {
  getDescriptionFromWeatherData,
  getTempsFromWeatherData,
  getWindFromWeatherData,
  getDetailsFromWeatherData,
  getDateTimeString,
};
