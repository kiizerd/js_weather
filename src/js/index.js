import '../styles/main.scss';
import { Now } from 'temporal-polyfill';
import forwardGeocodeQuery from './geocode';
import { getWeatherData } from './weather';
import { fillPageWithWeatherData } from './fillers';
import {
  getDescriptionFromWeatherData,
  getTempsFromWeatherData,
  getWindFromWeatherData,
  getDetailsFromWeatherData,
  getDateTimeString,
} from './getters';

// Add:
// Precipitation

const tickClockElement = () => {
  const clock = document.getElementById('clock');
  clock.dateTime = Now.instant().toString();
  clock.textContent = getDateTimeString();
};

const updateWeatherData = (lat, lon, name) => {
  getWeatherData(lat, lon).then((data) => {
    const { current, daily } = data;
    const iconCode = current.weather[0].icon;
    const weather = getDescriptionFromWeatherData(current.weather[0]);
    const temps = getTempsFromWeatherData({ current, daily: daily[0] });
    const wind = getWindFromWeatherData(current);
    const details = getDetailsFromWeatherData(current);
    const weatherData = {
      name, weather, temps, wind, details, iconCode, daily,
    };

    fillPageWithWeatherData(weatherData);
  });
};

const updateWeatherDataWithQuery = async (query) => {
  const [lat, lon, name] = await forwardGeocodeQuery(query).then((geoData) => {
    const queryData = geoData.data[0];
    return [queryData.latitude, queryData.longitude, queryData.name];
  });

  updateWeatherData(lat, lon, name);
};

// Initialize App

// Call once for initial load.
tickClockElement();
let lastQuery = 'London';
updateWeatherDataWithQuery(lastQuery);

document.getElementById('submit').onclick = async () => {
  const search = document.getElementById('search');
  const query = search.value;
  lastQuery = query;
  search.value = '';

  updateWeatherDataWithQuery(query);
};

// Update weather every minute.
setInterval(async () => {
  updateWeatherDataWithQuery(lastQuery);
}, 60000);

// Update clock every second.
setInterval(() => {
  tickClockElement();
}, 1000);
