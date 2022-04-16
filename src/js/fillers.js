import convertTemp from './convert_temp';
import getElements from './elements';
import { getWeatherIcon } from './weather';
import { getDescriptionFromWeatherData } from './getters';

const elements = getElements();

const fillPageCurrentStatus = (weatherData) => {
  elements.weather.children[0].textContent = weatherData.weather;
  getWeatherIcon(weatherData.iconCode, 2).then((url) => {
    elements.icon.src = url;
  });
  elements.location.textContent = weatherData.name;
};

const fillPageCurrentTemps = (tempData) => {
  const deg = '\u00B0';
  Object.keys(tempData).forEach((key) => {
    const temp = `${tempData[key]}${deg}C`;
    elements.temps[key].textContent = temp;
  });
};

const fillPageCurrentDetails = (currentDetails) => {
  const dewPoint = convertTemp(currentDetails.dewPoint, 'K');
  const { details } = elements;
  details.humidity.textContent = currentDetails.humidity;
  details.dewPoint.textContent = dewPoint;
  details.pressure.textContent = currentDetails.pressure;
  details.clouds.textContent = currentDetails.clouds;
  details.uvIndex.textContent = currentDetails.uvIndex;
  details.visibility.textContent = currentDetails.visibility;
};

const fillPageCurrentWind = (currentWind) => {
  elements.wind.speed.textContent = currentWind.speed;
  elements.wind.dir.textContent = currentWind.direction;
};

const fillPageCurrentData = (weatherData) => {
  const { temps, wind, details } = weatherData;

  fillPageCurrentStatus(weatherData);
  fillPageCurrentTemps(temps);
  fillPageCurrentWind(wind);
  fillPageCurrentDetails(details);
};

const fillPageDailyData = (weatherData) => {
  const daily = weatherData.daily.slice(1, weatherData.daily.length);
  const dayDivs = Array.from(elements.daily.children).slice(1, 7);
  dayDivs.forEach((dayDiv, dayIndex) => {
    const dayData = daily[dayIndex];
    const children = Array.from(dayDiv.children);
    const [subheader, icon, status, hiLow] = children.slice(1, children.length);

    // Add month and day to dayDiv header
    const unixTime = daily[dayIndex].sunrise - 100;
    const date = new Date(unixTime * 1000);
    const monthDay = date.toString().split(' ').slice(1, 3).join(' ');
    subheader.textContent = `${monthDay}`;

    // Add appropriate icon
    const iconCode = dayData.weather[0].icon;
    getWeatherIcon(iconCode, 2).then((url) => {
      icon.src = url;
    });

    // Add status
    const dayStatus = getDescriptionFromWeatherData(dayData.weather[0]);
    status.textContent = dayStatus;

    const dayHigh = convertTemp(dayData.temp.max, 'K');
    const dayLow = convertTemp(dayData.temp.min, 'K');
    const degree = '\u00B0';
    hiLow.textContent = `${dayLow}${degree}C - ${dayHigh}${degree}C`;
  });
};

const fillPageWithWeatherData = (weatherData) => {
  fillPageCurrentData(weatherData);
  fillPageDailyData(weatherData);
};

export {
  fillPageCurrentStatus,
  fillPageCurrentTemps,
  fillPageCurrentDetails,
  fillPageCurrentWind,
  fillPageCurrentData,
  fillPageDailyData,
  fillPageWithWeatherData,
};
