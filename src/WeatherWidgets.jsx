import './weatherWidget.css'

function weatherWidget(){
    return (
      <div className="weatherWidgets">
        
        <div className="weather-icon">
          <div className="icon">
            <div className="cloud"></div>
            <div className="rain"></div>
            <div className="rain"></div> 
          </div>
        </div>

        <div className="weather-icon">
          <div className="icon">
            <div className="cloud"></div>
            <div className="bolt"></div>
            <div className="bolt"></div>
          </div>
      </div>

        <div className="weather-icon">
          <div className="icon">
            <div className="cloud white"></div>
            <div className="flake"></div>
            <div className="flake"></div>
          </div>
        </div>

        <div className="weather-icon">
          <div className="icon">
            <div className="cloud white">
              <div className="cloudy"></div>
            </div>
          </div>
        </div>

        <div className="weather-icon">
          <div className="icon">
            <div className="cloud white">
            <div className="sunny"><div className="m-rays"></div></div>
            </div>
          </div>
        </div>

        <div className="weather-icon">
          <div className="icon">
              <div className="sun"><div className="rays"></div></div>
          </div>
        </div>
        
    </div>

        
    )
}
export default weatherWidget