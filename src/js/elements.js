const buildDailyForecast = () => {
  const days = ['mon', 'tues', 'wednes', 'thurs', 'fri', 'satur', 'sun'];
  const todayIndex = new Date().getDay() - 1;
  const sortedDays = [];
  for (let i = 0; i < 7; i += 1) {
    sortedDays.push(days[(i + todayIndex) % 7]);
  }
  const today = days[todayIndex];
  const otherDays = sortedDays.filter((day) => day !== today);
  const otherDayDivs = otherDays.map((day) => {
    // Fooday, Foomember 4th
    // ICON
    // status
    // hi / lo
    const dayDiv = document.createElement('div');
    const dayHeader = document.createElement('b');
    const daySubHeader = document.createElement('span');
    const dayIcon = new Image();
    const dayStatus = document.createElement('small');
    const dayHi = document.createElement('div');
    const dayLo = document.createElement('div');
    dayDiv.classList.add('day-div');
    dayDiv.id = `${day}day-forecast`;
    dayDiv.appendChild(dayHeader);
    dayDiv.appendChild(daySubHeader);
    dayDiv.appendChild(dayIcon);
    dayDiv.appendChild(dayStatus);
    dayDiv.appendChild(dayHi);
    dayDiv.appendChild(dayLo);
    dayHeader.textContent = `${day[0].toUpperCase()}${day.slice(1, day.length)}day`;
    return dayDiv;
  });

  return otherDayDivs;
};

const getElements = () => {
  const forecastWrapper = document.getElementById('wrapper');
  const currentLocation = document.getElementById('location');
  const currentWeather = document.getElementById('current-weather');
  const currentStatus = document.getElementById('current-weather-status');
  const currentIcon = document.getElementById('current-weather-icon');
  const currentTemp = document.getElementById('current-temp');
  const currentHigh = document.getElementById('current-high');
  const currentLow = document.getElementById('current-low');
  const currentFeelsLike = document.getElementById('current-feels-like');
  const humidity = document.getElementById('current-humidity');
  const dewPoint = document.getElementById('current-dew-point');
  const pressure = document.getElementById('current-pressure');
  const uvIndex = document.getElementById('current-uv-index');
  const visibility = document.getElementById('current-visibility');
  const windSpeed = document.getElementById('wind-speed');
  const windDirection = document.getElementById('wind-direction');
  const clouds = document.getElementById('current-clouds');
  const clock = document.getElementById('clock');
  const daily = document.getElementById('daily-forecast');
  buildDailyForecast().forEach((day) => {
    daily.appendChild(day);
  });

  return {
    wrapper: forecastWrapper,
    location: currentLocation,
    weather: currentWeather,
    status: currentStatus,
    icon: currentIcon,
    clock,
    daily,
    temps: {
      low: currentLow,
      high: currentHigh,
      current: currentTemp,
      feelsLike: currentFeelsLike,
    },
    wind: {
      speed: windSpeed,
      dir: windDirection,
    },
    details: {
      clouds,
      humidity,
      dewPoint,
      pressure,
      uvIndex,
      visibility,
    },
  };
};

export default getElements;
