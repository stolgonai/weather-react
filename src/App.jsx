// import css from "./App.css";
// import Carousel from "./components/Carousel";
// import Sidebar from "./components/Sidebar";
// import WeatherInfo from "./components/WeatherInfo";
import {useState} from 'react'


// fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=93acb782ba9cde069e257374df26c92b&units=metric&lang=ru')
// .then((res) => res.json())
// .then((data) => console.log(data))

function App() {
  const [searchBar, setSearchBar] = useState(false)

  const [countries, setCountries] = useState([])

  const [loadind, setLoading] = useState(false)

  const searchBarClass = "widget__searching " + (searchBar ? "opened" : "")

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

  return (
    <div className="App">
       <div className="widget">
        <button className="button widget__serching-open" onClick ={()=> setSearchBar(true)} >
          Поиск города
        </button>
        <div className="widget__icon">
          <img src="./img/image 16.png" alt="widget-icon" className="widget-icon__img"/>
        </div>
        <div className="widget__background">
          <img src="./img/Cloud-background 1.png" alt="background" className="widget-background__img"/>
        </div>
        <div className={searchBarClass}>
          <button className="searching__close" onClick ={()=> setSearchBar(false)}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26 2.61857L23.3814 0L13 10.3814L2.61857 0L0 2.61857L10.3814 13L0 23.3814L2.61857 26L13 15.6186L23.3814 26L26 23.3814L15.6186 13L26 2.61857Z" fill="#48484A"/>
            </svg>
          </button>
          <form className="searching__form" onSubmit={onSearch} >
            <input type="search" className="searching-form__input" type="search" name="query" />
            <button className=" button search-form__button" type="button" onClick={onSearch} >Найти</button>
          </form>

          {loading && (<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>)}
            <ul>
              {countries.map((country) =>
                <li key={country.id}> {country.display_name} </li>
              )}
            </ul>

        </div>
        <header className="widget__header"></header>
        <div className="widget__body">
          <div className="widget-body__temp">1<span className="temp__space">&nbsp;</span><span className="temp__symbol">°C</span></div>
          <div className="widget-body__text">Cнег</div>
          <div className="widget-body__feels-like">Ощущается как -3 °C</div>
          <div className="widget-body__date">
            <div className="date__text">Сегодня</div>
            <div className="date__info">Вс, 13 мар</div>
          </div>
          <div className="widget-body__geo">
            <div className="geo__icon">
              <svg width="24" height="34" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9999 0.333344C5.54992 0.333344 0.333252 5.55001 0.333252 12C0.333252 20.75 11.9999 33.6667 11.9999 33.6667C11.9999 33.6667 23.6666 20.75 23.6666 12C23.6666 5.55001 18.4499 0.333344 11.9999 0.333344ZM11.9999 16.1667C10.8949 16.1667 9.83504 15.7277 9.05364 14.9463C8.27224 14.1649 7.83325 13.1051 7.83325 12C7.83325 10.8949 8.27224 9.83513 9.05364 9.05373C9.83504 8.27233 10.8949 7.83334 11.9999 7.83334C13.105 7.83334 14.1648 8.27233 14.9462 9.05373C15.7276 9.83513 16.1666 10.8949 16.1666 12C16.1666 13.1051 15.7276 14.1649 14.9462 14.9463C14.1648 15.7277 13.105 16.1667 11.9999 16.1667Z" fill="#EC6E4D"/>
              </svg>
            </div>
            <div className="geo_city">Москва</div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
