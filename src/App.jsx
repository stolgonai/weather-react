// import css from "./App.css";
// import Carousel from "./components/Carousel";
// import Sidebar from "./components/Sidebar";
// import WeatherInfo from "./components/WeatherInfo";
import {useState} from 'react'
import cloudIcon from "./assets/cloud-solid.svg"
import rainIcon from "./assets/cloud-rain-solid.svg"
import snowIcon from "./assets/snowflake-regular.svg"
import sunIcon from "./assets/sun-regular.svg"
import windIcon from "./assets/wind-solid.svg"

const API_KEY = "93acb782ba9cde069e257374df26c92b"

const weatherIcon = {
  "sunny": sunIcon,
  "windy": windIcon,
  "snow": snowIcon,
  "rainy": rainIcon,
  "cloudy": cloudIcon,
}
 function getWeatherIcon(title){
   switch(title){
     case 'clear': return sunIcon
     case 'wind': return windIcon
     case 'snow': return snowIcon
     case 'rain': return rainIcon
     case 'cloud': return cloudIcon
     default: return cloudIcon
   }
 }


function App() {
  const [searchBar, setSearchBar] = useState(false)
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] =useState(null)
  const searchBarclassName = "widget__searching " + (searchBar ? "opened" : "")

  const dateTitle = new Intl.DateTimeFormat('en-GB', { 
    weekday: 'short', 
    day: '2-digit',
  month: "short" }).format(new Date())

  function onSearch(e){
    e.preventDefault()
    const form = new FormData(e.target)

    const query = form.get('query')

    setLoading(true)

    fetch(`https://nominatim.openstreetmap.org/search.php?q=${query}&format=json&addressdetails=1`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data)
        setLoading(false)
      })
  }

  function getWeather(country){
    const { lat, lon, address } =country
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=eng`)
    .then((res)=> res.json())
    .then((data) =>{ 
      setWeather({
        temp: Math.round(data.main.temp),
        tempFeelsLike: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        title:data.weather[0].main.toLowerCase(),
        city: address.city

      })
      setSearchBar(false)
    })

  }




  return (
    <div className="App">
       <div className="widget">
          <button className="button widget__serching-open" onClick ={()=> setSearchBar(true)} >
            Search for city
          </button>
        { weather && (<div className="widget__icon">
            <img src={getWeatherIcon(weather.title)} alt="widget-icon" className="widget-icon__img"/>
          </div>)}
      
          <div className={searchBarclassName}>
            <button className="searching__close" onClick ={()=> setSearchBar(false)}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26 2.61857L23.3814 0L13 10.3814L2.61857 0L0 2.61857L10.3814 13L0 23.3814L2.61857 26L13 15.6186L23.3814 26L26 23.3814L15.6186 13L26 2.61857Z" fill="#48484A"/>
              </svg>
            </button>
            <form className="searching__form" onSubmit={onSearch} >
              <input type="search" className="searching-form__input" type="search" name="query" />
              <button className=" button search-form__button" type="button" type="submit"> Search  </button>
            </form>

            {loading && (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>)}
              <ul className="search-results">
                {countries.map((country) =>
                  <li key={country.place_id}> 
                  <button onClick={()=>getWeather(country)} > {country.display_name} </button>
                  </li>
                )}
              </ul>

          </div>
       
          <header className="widget__header"></header>
          { weather && (
            <div className="widget__body">
            <div className="widget-body__temp">
              {weather.temp}
              <span className="temp__space">&nbsp;</span><span className="temp__symbol">°C</span></div>
            <div className="widget-body__text"> {weather.description} </div>
            <div className="widget-body__feels-like">
              Real feel {weather.tempFeelsLike} °C </div>
            <div className="widget-body__date">
              <div className="date__text">Today</div>
              <div className="date__info"> {dateTitle}  </div>
            </div>
            <div className="widget-body__geo">
              <div className="geo__icon">
                <svg width="24" height="34" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9999 0.333344C5.54992 0.333344 0.333252 5.55001 0.333252 12C0.333252 20.75 11.9999 33.6667 11.9999 33.6667C11.9999 33.6667 23.6666 20.75 23.6666 12C23.6666 5.55001 18.4499 0.333344 11.9999 0.333344ZM11.9999 16.1667C10.8949 16.1667 9.83504 15.7277 9.05364 14.9463C8.27224 14.1649 7.83325 13.1051 7.83325 12C7.83325 10.8949 8.27224 9.83513 9.05364 9.05373C9.83504 8.27233 10.8949 7.83334 11.9999 7.83334C13.105 7.83334 14.1648 8.27233 14.9462 9.05373C15.7276 9.83513 16.1666 10.8949 16.1666 12C16.1666 13.1051 15.7276 14.1649 14.9462 14.9463C14.1648 15.7277 13.105 16.1667 11.9999 16.1667Z" fill="#EC6E4D"/>
                </svg>
              </div>
              <div className="geo_city">{weather.city}</div>
            </div>
          </div>
          ) 
           }
      </div>

      <main className="main">

        <div className="main__container">
          <div className="main__forecast">
            <div className="forecast__header">
             
              <div className="forecast-header__title">
                Weather
              </div>
              
              <div className="forecast-header__radios">
                <label className="forecast-radio__label">
                  <input type="radio" name="forecast-type" className="forecast-radio__input"  data-forecast="weekly" />
                  <span className="forecast-radio__text forecast-radio__text_active"> Weekly </span>
                </label>
                <label className="forecast-radio__label">
                  <input type="radio" name="forecast-type" className="forecast-radio__input"  data-forecast="hourly"/>
                  <span className="forecast-radio__text">Hourly </span>
                </label>
              </div>              
           
            </div>
           
            <div className="forecast__panel" data-forecast-type="weekly">
         
              <div className="forecast__body">
                <div className="forecast-body__cards">
                  <div className="forecast-card">
                    <div className="forecast-card__title">Tomorrow</div>
                      <div className="forecast-card__icon">
                        <img src="./img/Panel day/1.png" alt="icon"/>
                      </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                      <div className="forecast-card__min-temp">4°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">Пн, 15 мар</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/2.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                      <div className="forecast-card__min-temp">4°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">Пн, 16 мар</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/2.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                      <div className="forecast-card__min-temp">4°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">Пн, 17 мар</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/3.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                      <div className="forecast-card__min-temp">4°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">Пн, 18 мар</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/3.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                      <div className="forecast-card__min-temp">4°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">Пн, 19 мар</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/3.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                      <div className="forecast-card__min-temp">4°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">Пн, 20 мар</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/3.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                      <div className="forecast-card__min-temp">4°C</div>
                    </div>
                  </div>
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
           
            <div className="forecast__panel" style={{visibility: "hidden", opacity: "0", height: "0"}} data-forecast-type="hourly">
              <div className="forecast__body">
                <div className="forecast-body__cards">
                  <div className="forecast-card">
                    <div className="forecast-card__title">15:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/1.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">16:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/1.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">17:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/1.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">18:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/1.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">19:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/2.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">20:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/2.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">21:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/1.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">22:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/1.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">23:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/2.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">00:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/1.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">01:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/1.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
                  <div className="forecast-card">
                    <div className="forecast-card__title">02:00</div>
                    <div className="forecast-card__icon">
                      <img src="./img/Panel day/1.png" alt="icon"/>
                    </div>
                    <div className="forecast-card__text">
                      <div className="forecast-card__max-temp">10°C</div>
                    </div>
                  </div>
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
          </div>
        
          <div className="main__details">
            <div className="main-datails__header">More for today</div>
            <div className="main-details__cards">
              <div className="details-card">
                <div className="details-card__title">Wind</div>
                  <div className="details-card__body">
                    7 <span className="details-card__body_smaller">м/с</span>
                  </div>
                <div className="details-card__footer">
                  <div className="details-footer__icon">
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="19" cy="19" r="19" fill="#48484A"/>
                      <path d="M18.1951 31.0029L10.0872 10.8978C9.76221 10.092 10.5487 9.28365 11.3631 9.58643L31.9073 17.2246C32.7267 17.5293 32.7906 18.6717 32.0237 19.0912C26.1915 22.2822 23.1612 25.3608 20.0501 31.0907C19.6388 31.8482 18.5175 31.8023 18.1951 31.0029Z" fill="#E6E6E6"/>
                    </svg>
                  </div>
                  <div className="details-footer__text">СЗ</div>
                </div>
              </div>
              <div className="details-card">
                <div className="details-card__title">Humidity</div>
                <div className="details-card__body">
                  84 <span className="details-card__body_smaller">%</span>
                </div>
              </div>
              <div className="details-card">
                <div className="details-card__title">Visibility</div>
                <div className="details-card__body">
                  6.2 <span className="details-card__body_smaller">км</span>
                </div>
              </div>
              <div className="details-card">
                <div className="details-card__title">Pressure</div>
                <div className="details-card__body">
                  742 <span className="details-card__body_smallest">мм рт. ст.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>


    </div>
  );
}

export default App;
