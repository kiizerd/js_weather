import '.././styles/main.scss';

const openWeatherUrl      = 'http://api.openweathermap.org/';
const openWeatherEndpoint = 'data/2.5/weather?q=London';
// &APPID=1111111111'

function component() {
  const element = document.createElement('div');

  element.textContent = 'Hello Webpack!';
  element.classList.add('hello');

  return element;
}
