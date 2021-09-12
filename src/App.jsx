import {useState} from 'react'
import cloudIcon from "./assets/cloud-solid.svg"
import rainIcon from "./assets/cloud-rain-solid.svg"
import snowIcon from "./assets/snowflake-regular.svg"
import sunIcon from "./assets/sun-regular.svg"
import windIcon from "./assets/wind-solid.svg"
import WeatherWidgets from './WeatherWidgets'

const API_KEY = "93acb782ba9cde069e257374df26c92b"
const BASE_URL = "https://api.openweathermap.org/data/2.5"
let timeZone;

function getWeatherIcon(title) {
  switch(title) {
    case 'clear': return sunIcon
    case 'snow': return snowIcon
    case 'rain': return rainIcon
    case 'wind': return windIcon
    case 'clouds': return cloudIcon
    default: return cloudIcon
  }
}

function normalizeWeatherData(data) {
  return {
    temp: (typeof data.temp === "number") ? Math.round(data.temp) : {
      min: Math.round(data.temp.min),
      max: Math.round(data.temp.max)
    },
    tempFeelsLike: Math.round(data.feels_like),
    description: data.weather[0].description,
    title: data.weather[0].main.toLowerCase(),
    humidity: data.humidity,
    windSpeed: data.wind_speed,
    visibility: data.visibility / 1000,
    pressure: data.pressure,
    datetime: new Date(data.dt * 1000),
  }
}

const dayFormatter = new Intl.DateTimeFormat('en-Us', {
  weekday: "short",
  day: "numeric",
  month: "short",
})

// const hourFormatter = new Intl.DateTimeFormat('en-En', {
//   hour12: false,
//   hour: "numeric",
//   minute: "numeric"
// })


function formatByTimeZone(date){
  console.log(timeZone, "this is time zone")
  return new Intl.DateTimeFormat('en-En', {
    timeZone: timeZone,
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  }).format(date)

  
}

function DailyWeather({ weatherList }) {

  return (
    <div className="forecast__panel">
      <div className="forecast__body">
        <div className="forecast-body__cards">
          {weatherList.map((w) => (
            <div className="forecast-card" key={w.datetime.getTime()}>
              <div className="forecast-card__title">
                {dayFormatter.format(w.datetime)}
              </div>
              <div className="forecast-card__icon">
                <img src={getWeatherIcon(w.title)} alt="icon" width="40" />
              </div>
              <div className="forecast-card__text">
                <div className="forecast-card__max-temp">{w.temp.max}°C</div>
                <div className="forecast-card__min-temp">{w.temp.min}°C</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="forecast-button forecast-button_disabled forecast-button_reversed js-forecast-button_left">
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L10.1265 7.14974C10.758 7.54068 10.758 8.45932 10.1265 8.85027L1 14.5" stroke="#ACACAC" strokeWidth="3"/>
        </svg>
      </button>
      <button className="forecast-button js-forecast-button_right">
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L10.1265 7.14974C10.758 7.54068 10.758 8.45932 10.1265 8.85027L1 14.5" stroke="#ACACAC" strokeWidth="3"/>
        </svg>
      </button>
    </div>
  )
}


function HourlyWeather({ weatherList }) {
  
  return (
    <div className="forecast__panel">
      <div className="forecast__body">
        <div className="forecast-body__cards">
          {weatherList.map((w) => (
            <div className="forecast-card" key={w.datetime.getTime()}>
              <div className="forecast-card__title">{formatByTimeZone(w.datetime)}</div>
              <div className="forecast-card__icon">
                <img src={getWeatherIcon(w.title)} alt="icon" width="40" />
              </div>
              <div className="forecas t-card__text">
                <div className="forecast-card__max-temp">{w.temp}°C</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="forecast-button forecast-button_disabled forecast-button_reversed js-forecast-button_left">
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L10.1265 7.14974C10.758 7.54068 10.758 8.45932 10.1265 8.85027L1 14.5" stroke="#ACACAC" strokeWidth="3"/>
        </svg>
      </button>
      <button className="forecast-button js-forecast-button_right">
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L10.1265 7.14974C10.758 7.54068 10.758 8.45932 10.1265 8.85027L1 14.5" stroke="#ACACAC" strokeWidth="3"/>
        </svg>
      </button>
    </div>
  )
}

function App() {
  const [searchBar, setSearchBar] = useState(false);
  const [contries, setContries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null || weather);
  const [isDaily,  setIsDaily] = useState(true)
  
  console.log(contries)

  const hourFormatter = new Intl.DateTimeFormat('en-En', {
    timeZone: weather && weather.timeZone,
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  })


  function onSearch(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const query = form.get("query");
    setLoading(true);
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&units=metric&addressdetails=1`
      )
      .then((res) => res.json())
      .then((data) => {
        setContries(data);
        setLoading(false);
      });
    }
    console.log(weather)
    function getWeather(country) {
      const { lat, lon, display_name } = country;
      fetch(
        `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=current&cnt=4&appid=${API_KEY}&units=metric&lang=en`
        )
        .then((res) => res.json())
        .then((data) => {
          setWeather({
            current: {
              ...normalizeWeatherData(data.hourly[0]),
              city: display_name.split(',')[0],
            },
            hourly: data.hourly.map((w) => normalizeWeatherData(w)),
            daily: data.daily.map((w) => normalizeWeatherData(w)),
            timeZone: data.timezone 
            
          });
          setSearchBar(false);
          timeZone = data.timezone
        });
      }
      
      const searchBarClass = "widget__searching " + (searchBar ? "opened" : "");
      
      const dateTitle = dayFormatter.format(new Date())
      
      return (
    <div className="app">
      <div className="widget">

      <div>
          <button
            className="button widget__serching-open"
            onClick={() => setSearchBar(true)}
          >
            Search for city
          </button>
        </div>

       {!weather && <div className="quot"> 
          <p className="quote">
            “Wherever you go, no matter what the weather, always bring your own sunshine.”
          </p>
          <span>
            ― Anthony J. D'Angelo
          </span>
        
        </div>}
       
        {weather  && (
          <div className="widget__icon">
            <img src={getWeatherIcon(weather.current.title)} alt="widget-icon" className="widget-icon__img" />
          </div>
        )}
        <div className={searchBarClass}>
          <button
            className="searching__close"
            onClick={() => setSearchBar(false)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 2.61857L23.3814 0L13 10.3814L2.61857 0L0 2.61857L10.3814 13L0 23.3814L2.61857 26L13 15.6186L23.3814 26L26 23.3814L15.6186 13L26 2.61857Z"
                fill="#48484A"
              />
            </svg>
          </button>
          <form className="searching__form" onSubmit={onSearch}>
            <input
              type="search"
              name="query"
              placeholder="Please enter the city"
              className="searching-form__input"
            />
            <button className=" button search-form__button" type="submit">
              Search
            </button>
          </form>
          {loading && (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          <ul className="search-results">
            {contries.slice(0,4).map((country) => (
             !country.address.display_name ?
                (<li key={country.place_id}>
                <button className="btn searchResult" onClick={() => getWeather(country)}>
                  {country.display_name}
                </button>
              </li>) : (
                <li key={country.place_id}>
                <button className="btn searchResult" onClick={() => getWeather(country)}>
                  {`${country.address.city || country.address.town || country.address.village }, ${country.address.state}, ${country.address.country}`}
                </button>
              </li>
              )
             ))}
          </ul>
        </div>
        {weather && (
          <div className="widget__body">
            <div className="widget-body__temp">
            <div className="widget-body__date">
              <div className="date__text">Today</div>
              <div className="date__info">{dateTitle}</div>
            </div> 
              {weather.current.temp} <span className="temp__symbol">°C</span>
            </div>
            <div className="widget-body__text">{weather.current.description}</div>
            <div className="widget-body__feels-like">
              Feels like {weather.current.tempFeelsLike} °C
            </div>
           
            <div className="widget-body__"geo>
              <div className="geo__icon">
                <svg
                  width="24"
                  height="34"
                  viewBox="0 0 24 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9999 0.333344C5.54992 0.333344 0.333252 5.55001 0.333252 12C0.333252 20.75 11.9999 33.6667 11.9999 33.6667C11.9999 33.6667 23.6666 20.75 23.6666 12C23.6666 5.55001 18.4499 0.333344 11.9999 0.333344ZM11.9999 16.1667C10.8949 16.1667 9.83504 15.7277 9.05364 14.9463C8.27224 14.1649 7.83325 13.1051 7.83325 12C7.83325 10.8949 8.27224 9.83513 9.05364 9.05373C9.83504 8.27233 10.8949 7.83334 11.9999 7.83334C13.105 7.83334 14.1648 8.27233 14.9462 9.05373C15.7276 9.83513 16.1666 10.8949 16.1666 12C16.1666 13.1051 15.7276 14.1649 14.9462 14.9463C14.1648 15.7277 13.105 16.1667 11.9999 16.1667Z"
                    fill="#EC6E4D"
                  />
                </svg>
              </div>
              <div className="geo_city">{weather.current.city}</div>
            </div>
          </div>
        )}
      </div>
      
      <main className="main">
        {!weather && < WeatherWidgets />}
        {weather && (
          <div className="main__container">
            <div className="main__forecast">
              <div className="forecast__header">
                <div className="forecast-header__title">
                  Forecast
                </div>
                <div className="forecast-header__radios">
                  <label className="forecast-radio__label">
                    <input type="radio" name="forecast-type" checked={isDaily} onChange={() => setIsDaily(true)} className="forecast-radio__input" data-forecast="weekly" />
                    <span className="forecast-radio__text forecast-radio__text_active">weekly</span>
                  </label>
                  <label className="forecast-radio__label">
                    <input type="radio" name="forecast-type" checked={!isDaily} onChange={() => setIsDaily(false)} className="forecast-radio__input" data-forecast="hourly" />
                    <span className="forecast-radio__text">hourly</span>
                  </label>
                </div>              
              </div>
              {isDaily ? (
                <DailyWeather weatherList={weather.daily} />
              ) : (            
                <HourlyWeather weatherList={weather.hourly} />
              )}
            </div>
            {weather && (
              <div className="main__details">
                <div className="main-datails__header">Today</div>
                <div className="main-details__cards">
                  <div className="details-card">
                    <div className="details-card__title">Wind Gust</div>
                    <div className="details-card__body">
                      {weather.current.windSpeed} <span className="details-card__body_smaller">m/s</span>
                    </div>
                    <div className="details-card__footer">
                      <div className="details-footer__icon">
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="19" cy="19" r="19" fill="#48484A"/>
                          <path d="M18.1951 31.0029L10.0872 10.8978C9.76221 10.092 10.5487 9.28365 11.3631 9.58643L31.9073 17.2246C32.7267 17.5293 32.7906 18.6717 32.0237 19.0912C26.1915 22.2822 23.1612 25.3608 20.0501 31.0907C19.6388 31.8482 18.5175 31.8023 18.1951 31.0029Z" fill="#E6E6E6"/>
                        </svg>
                      </div>
                      <div className="details-footer__text">NW</div>
                    </div>
                  </div>
                  <div className="details-card">
                    <div className="details-card__title">Humidity</div>
                    <div className="details-card__body">
                      {weather.current.humidity} <span className="details-card__body_smaller">%</span>
                    </div>
                  </div>
                  <div className="details-card">
                    <div className="details-card__title">Visibility</div>
                    <div className="details-card__body">
                      {weather.current.visibility} <span className="details-card__body_smaller">m</span>
                    </div>
                  </div>
                  <div className="details-card">
                    <div className="details-card__title">Atmospheric pressure</div>
                    <div className="details-card__body">
                      {weather.current.pressure} <span className="details-card__body_smallest">mb</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App