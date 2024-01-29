import './App.css';
import { Oval } from 'react-loader-spinner'; 
import React, { useState } from 'react'; 
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFrown } from '@fortawesome/free-solid-svg-icons'; 

function App() {
  const [input, setInput] = useState(''); 
  const [weather, setWeather] = useState({ 
      loading: false, 
      data: {}, 
      error: false, 
  }); 

  const toDateFunction = () => { 
      const months = [ 
          'January', 
          'February', 
          'March', 
          'April', 
          'May', 
          'June', 
          'July', 
          'August', 
          'September', 
          'October', 
          'November', 
          'December', 
      ]; 
      const WeekDays = [ 
          'Sunday', 
          'Monday', 
          'Tuesday', 
          'Wednesday', 
          'Thursday', 
          'Friday', 
          'Saturday', 
      ]; 
      const currentDate = new Date(); 
      const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()] 
          }`; 
      return date; 
  }; 

  const search = async (event) => { 
      if (event.key === 'Enter') { 
          event.preventDefault(); 
          setInput(''); 
          setWeather({ ...weather, loading: true }); 
          const url = 'https://api.openweathermap.org/data/2.5/weather'; 
          const api_key = 'f00c38e0279b7bc85480c3fe775d518c'; 
          await axios 
              .get(url, { 
                  params: { 
                      q: input, 
                      units: 'metric', 
                      appid: api_key, 
                  }, 
              }) 
              .then((res) => { 
                  console.log('res', res); 
                  setWeather({ data: res.data, loading: false, error: false }); 
              }) 
              .catch((error) => { 
                  setWeather({ ...weather, data: {}, error: true }); 
                  setInput(''); 
                  console.log('error', error); 
              }); 
      } 
  }; 
  return (

    <div className="App"> 
    <h1 className="app-name"> 
    <img src="https://th.bing.com/th/id/R.770b805d5c99c7931366c2e84e88f251?rik=khgO%2bY1Hh3BT9w&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-weather-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596142qx4ep.png&ehk=6msbAydV7X6D4bO8zvLC664aXwKOdBU17dwrHcKxaAg%3d&risl=&pid=ImgRaw&r=0" width={'50px'} height={'50px'} alt="" ></img>
         Weather App 
    </h1> 
    <div className="search-bar"> 
        <input 
            type="text"
            className="city-search"
            placeholder="Enter City Name.."
            name="query"
            value={input} 
            onChange={(event) => setInput(event.target.value)} 
            onKeyPress={search} 
        /> 
    </div> 
    {weather.loading && ( 
        <> 
            <br /> 
            <br /> 
            <Oval type="Oval" color="black" height={100} width={100} /> 
        </> 
    )} 
    {weather.error && ( 
        <> 
            <br /> 
            <br /> 
            <span className="error-message"> 
                <FontAwesomeIcon icon={faFrown} /> 
                <span style={{ fontSize: '20px' }}>City not found</span> 
            </span> 
        </> 
    )} 
    {weather && weather.data && weather.data.main && ( 
        <div> 
            <div className="city-name"> 
                <h2> 
                    {weather.data.name}, <span>{weather.data.sys.country}</span> 
                </h2> 
            </div> 
            <div className="date"> 
                <span>{toDateFunction()}</span> 
            </div> 
            <div className="icon-temp"> 
                <img 
                    className=""
                    src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} 
                    alt={weather.data.weather[0].description} 
                /> 
                {Math.round(weather.data.main.temp)} 
                <sup className="deg">°C</sup> 
            </div> 
            <div className="des-wind"> 
                <p>{weather.data.weather[0].description.toUpperCase()}</p> 
            </div> 
        </div> 
    )} 
</div>
  );
}

export default App;