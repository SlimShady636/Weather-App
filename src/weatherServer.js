

const api_Key='fc27dd808cb187a1602ba76d69212326'
const iconURL1 = (iconId)=> `https://openweathermap.org/img/wn/${iconId}@2x.png`;
const weatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}&units=${units}`;
    const data = await fetch(URL)
    .then((res)=>res.json())
    .then((data)=>data)
    const {weather,main:{temp,temp_min,temp_max,humidity,feels_like,pressure},wind:{speed},sys:{country},name}=data
    const {description,icon} = weather[0]
    return{
        description,iconURL:iconURL1(icon),weather,temp,temp_min,temp_max,humidity,feels_like,pressure,speed,country,name
    }
    
}
export default weatherData