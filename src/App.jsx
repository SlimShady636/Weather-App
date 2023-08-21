import React from 'react';
import { createRoot } from 'react-dom/client';
import hot from './assets/hot.jpg';
import cold from './assets/cold.jpg';
import Descriptions from './components/Descriptions';
import weatherData from './weatherServer';
import { useState,useEffect } from 'react';

const App = () => {
  const [weather,setWeather]=useState(null)
  const [city,setCity]=useState("Glasgow")
  const [units,setUnits]= useState('metric')
  const [background,setBackground]=useState(hot)
  const limitTemp= units === 'metric' ? 20 : 60
  
  const handleButtonClick = (e) =>{
    const button = e.currentTarget
    const textButton = button.innerText.slice(1)
    const isCelsius = textButton === 'C'
    button.innerText= isCelsius ? '°F' :'°C'
    setUnits(isCelsius ? 'metric':'imperial')
  }
  const enterKeyPress = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };


  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await weatherData(city, units);
      setWeather(data); 
      if (data.temp<=limitTemp)
        {setBackground(cold)}
      else
{        setBackground(hot)
}    };
    fetchWeatherData(); 
  }, [units,city])
  
  return (
    <div className="app" style={{backgroundImage:`url(${background})`}}>
<div className="overlay">
  {
    weather && (
      <div className="container">
      <div className=" section section__inputs">
        <input onKeyDown={enterKeyPress} type="text" name="city" placeholder="Enter City"/>
        <button onClick={(e)=> handleButtonClick(e)}>°F</button>
        </div>
        <div className="section section__temperature">
          <div className="icon">
            <h3>{`${weather.name},${weather.country}`}</h3>
            <img src={weather.iconURL} alt="weather-icon"></img>
            <h3>{weather.description}</h3>
          </div>
          <div className="temperature">
            <h1>{weather.temp.toFixed()}°{units==='metric' ? 'C' : 'F'}</h1>
          </div>
        </div>
        {/* bottom description */}
        <Descriptions weather={weather} units={units}/>
      </div>
    )
  }
  
  </div>
  
</div>

  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;
