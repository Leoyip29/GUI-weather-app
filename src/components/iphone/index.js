import { h, render, Component } from 'preact';
import style from './style.less';
import style_iphone from '../button/style_iphone';
import $ from 'jquery';
import Button from '../button';
import './fonts.css';
import ExerciseTips from './ExerciseTips';
import Functions from './Functions';

export default class Iphone extends Component {
    constructor(props) {
        super(props);
        this.state.temp = "";
        this.setState({ display: true, hourlyWeather: [], alertMessage: "", showExerciseTips: false });
    }
    state = {
        showAirQ: false,
        showWindSpeed: false,
        showWindDirection: false,
        showHumidity: false
    }
    showInfo = () => {
        this.setState({showBox: true});
    }
    closeInfoBox = () => {
        this.setState({showBox: false});
    }
    
//This function is called after the component has been mounted in the DOM. It is used to fetch the weather data, update the time and set an interval to fetch the weather data every 5 minutes.
    componentDidMount() {
        this.checkWeatherData();
        this.updateTime();
        this.WeatherInterval();
    }
//called in componentDidMount() to set an interval to fetch weather data every 5 minutes.
    WeatherInterval = () => {
        setInterval(() => {
            this.checkWeatherData();
        }, 5 * 60 * 1000); // Fetch data every 5 minutes
    }
//clear the alert message.
    clearAlert = () => {
        this.setState({ alertMessage: "" });
    }
//checks the current weather conditions and temperature
    Alert = () => {
        const { cond, temp } = this.state;
    
        if (!cond || !temp) return;
    
        const condition = cond.toLowerCase();
        const temperature = parseInt(temp);
    
        // Clear existing alert message
        this.setState({ alertMessage: "" });
    
        if (condition.includes("heavy rain")) {
            this.setState({ alertMessage: "⚠️ Alert OAO: Heavy rain..... Stay safe!" });
        } else if (condition.includes("snow")) {
            this.setState({ alertMessage: "⚠️ Alert >A<: Snow!!!!! slippery roads!" });
        } else if (condition.includes("thunderstorm")) {
            this.setState({ alertMessage: "⚠️ Alert *A*: Thunderstorms !!!!! Stay home and no more electricity" });
        } else if (condition.includes("extreme")) {
            this.setState({ alertMessage: "⚠️ Alert *W*: Extreme weather. =W= please stay alive" });
        }
    
        if (temperature <= 0) {
            this.setState({ alertMessage: "⚠️ Weather =A=: Freezing. very cold and icey road" });
        } else if (temperature >= 35) {
            this.setState({ alertMessage: "⚠️ Weather Alert: very hot. drink some water!" });
        }
    }
    
    //controls the display of exercise tips.
    toggleExerciseTipsPage = () => {
        this.setState((prevState) => ({ showExerciseTipsPage: !prevState.showExerciseTipsPage }));
    }
    
    
	//This code used to do the dynamic background
    dynamicBackground() {
        const { cond } = this.state;

        if (!cond) return '';

        if (cond.includes('rain') || cond.includes('shower')) {
            return 'url("../../assets/backgrounds/rainy-iphone.jpg")';
        } else if (cond.includes('snow')) {
            return 'url("../../assets/backgrounds/snowy-iphone.jpg")';
        } else if (cond.includes('cloud')) {
            return 'url("../../assets/backgrounds/cloudy-iphone.jpg")';
        } else {
            return 'url("../../assets/backgrounds/clear-iphone.jpg")';
        }
    }
    //Get real-time date,time,day
    updateTime = () => {
        setInterval(() => {
            const dt = new Date();
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const day = days[dt.getDay()];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const date = `${months[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`;
            const hours = dt.getHours();
            const minutes = dt.getMinutes().toString().padStart(2, '0');
            const seconds = dt.getSeconds().toString().padStart(2, '0');
            const time = `${hours}:${minutes}:${seconds}`;
            this.setState({ day, date, time });
        }, 1000);
    }
    //get weather api
    checkWeatherData = () => {
        var url = "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=a47d3dea012dd72308b85d2b15540f79";
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: this.parseResponse,
            error: function (req, err) { console.log('API call failed ' + err); }
        })

        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=a47d3dea012dd72308b85d2b15540f79";
        $.ajax({
            url: forecastUrl,
            dataType: "jsonp",
            success: this.Forecast,
            error: function (req, err) { console.log('API call failed ' + err); }
        })

        var airQualityUrl = "https://api.openweathermap.org/data/2.5/air_pollution?lat=51.5074&lon=-0.1278&appid=a47d3dea012dd72308b85d2b15540f79";
        $.ajax({
            url: airQualityUrl,
            dataType: "jsonp",
            success: this.AirQuality,
            error: function (req, err) { console.log('API call failed ' + err); }
        })

        this.setState({ display: false });
    }
// call function and css
    render() {
        const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

        return (
            <div class={style.container} style={{ backgroundImage: this.dynamicBackground() }}>
                <div class={style.header}>
                    <div class={style.tips}>
                        <ExerciseTips/>
                    </div>
                    <div class={style.headbox}>
                        <div class={style.date_time}>
                            <div class={`${style.day} ${style.fade_in}`}>{this.state.day}</div>
                            <div class={`${style.date} ${style.fade_in}`}>{this.state.date}</div>
                            <div class={`${style.time} ${style.fade_in}`}>{this.state.time}</div>
                        </div>
                        <div class={style.city}>{this.state.locate}</div>
                        <div class={style.conditions}>{this.state.cond}</div>
                        <div class={style.temperature_container}>
                            <span class={tempStyles}>{this.state.temp}</span>
                            <div class={style.temp_min_max}>
                                <span class={style.temp_min}>Min: {this.state.temp_min}&deg;C</span>&ensp;
                                <span class={style.temp_max}>Max: {this.state.temp_max}&deg;C</span>
                            </div>
                        </div>
                    </div>
                    {this.state.alertMessage && (
                    <div class={style.alertMessageBox}>
                        <p>{this.state.alertMessage}</p>
                        <button onClick={this.clearAlert}>Dismiss</button>
                    </div>
                    )}
                </div>
                <div class={style.details}>
                    <div class={style.weathercontainer}>
                        <div class={style.weatherbox}>
                            <h4>Air Quality <button onClick={() => this.setState({showAirQ: true})} class = {`${style.button}`}>i</button></h4>
                            {this.state.showAirQ && (
                                <div class = {`${style.box}`} >
                                    <p>Air quality levels </p>
                                    <span>1: Good <br/></span>
                                    <span>2: Fair<br/></span>
                                    <span>3: Moderate<br/></span>
                                    <span>4: Poor<br/></span>
                                    <span>5: Very Poor<br/></span>
                                    <button onClick={() => this.setState({showAirQ: false})}class = {`${style.buttonC}`}>Close</button>
                                </div>
                            )}
                            
                            <img src="../../assets/air_quality.png" alt="Air Quality" />
                            <p>{this.state.airQuality}</p>
                        </div>
                        <div class={style.weatherbox}>
                            <h4>Wind Speed <button onClick={() => this.setState({showWindSpeed: true})} class = {`${style.button}`}>i</button></h4>
                            {this.state.showWindSpeed && (
                                <div class = {`${style.box}`} >
                                    <p>This is the average wind speed at any given time. </p>
                                    <button onClick={() => this.setState({showWindSpeed: false})}class = {`${style.buttonC}`}>Close</button>
                                </div>
                            )}
                            <img class={style.imageWind} src="../../assets/wind_speed.png" alt="Wind Speed" />
                            <p>{Functions.windSpeedToKM(this.state.windSpeed)} km/h</p>
                        </div>
                        <div class={style.weatherbox}>
                            <h4>Wind Direction <button onClick={() => this.setState({showWindDirection: true})} class = {`${style.button}`}>i</button></h4>
                            {this.state.showWindDirection && (
                                <div class = {`${style.box}`}>
                                    <span>The degrees show where the wind is blowing from<br/></span>
                                    <span>The directions show where the wind is blowing from<br/></span>
                                    <span>The arrow shows where the wind is blowing to<br/></span>
                                    <button onClick={() => this.setState({showWindDirection: false})}class = {`${style.buttonC}`}>Close</button>
                                    </div>
                            )}
                            <img src="../../assets/wind_direction.png" alt="Wind Direction" />
                            <p>{this.state.windDirection}&deg; - {Functions.windOrigin(this.state.windDirection)} {Functions.windDirectionArrow(this.state.windDirection)}</p>
                        </div>
                        <div class={style.weatherbox}>
                            <h4>Humidity <button onClick={() => this.setState({showHumidity: true})} class = {`${style.button}`}>i</button></h4>
                            {this.state.showHumidity && (
                                <div class = {`${style.box}`}>
                                    <p>Humidity is the amount of water vapour in the air. </p>
                                    <span> The higher the humidity, the harder it will be for your body to cool down <br/></span>
                                    <span>If the air is wet(humid), it will be harder for your body to evaporate sweat<br/></span>
                                    <button onClick={() => this.setState({showHumidity: false})}class = {`${style.buttonC}`}>Close</button>
                                </div>
                            )}
                            <img src="../../assets/humidity.png" alt="Humidity" />
                            <p>{this.state.humidity}%</p>
                        </div>
                        <div class={style.weatherbox}>
                            <h4>Visibility <button onClick={() => this.setState({showVisibility: true})} class = {`${style.button}`}>i</button></h4>
                            {this.state.showVisibility && (
                                <div class = {`${style.box}`}>
                                    <p>Visibility is a measure of how far an object can be easily seen.</p>
                                    <span>Excellent: More than 40km <br/></span>
                                    <span>Very Good: 20.1km to 40km <br/></span>
                                    <span>Good:      10.1km to 20km <br/></span>
                                    <span>Moderate:  4.1km to 10km<br/></span>
                                    <span>Poor:      1.1km to 4km <br/></span>
                                    <span>Very poor: Less than 1km <br/></span>
                                    <button onClick={() => this.setState({showVisibility: false})}class = {`${style.buttonC}`}>Close</button>
                                </div>
                            )}
                            <img src="../../assets/visibility.png" alt="Visibility" />
                            <p>{this.state.visibility} km</p>
                        </div>
                        <div class={style.weatherbox}>
                            <h4>Raiting <button onClick={() => this.setState({showRaiting: true})} class = {`${style.button}`}>i</button></h4>
                            {this.state.showRaiting && (
                                <div class = {`${style.box}`}>
                                    <p>A raiting for how comfortable it is to do sports outside. The number is calculated based on user feedback(1-5):</p>
                                    <span>Temperature = 47%<br/></span>
                                    <span>Humidity = 26%<br/></span>
                                    <span>Precipitation = 21%<br/></span>
                                    <span>Wind Speed = 6%<br/></span>
                                    <button onClick={() => this.setState({showRaiting: false})}class = {`${style.buttonC}`}>Close</button>
                                </div>
                            )}
                            <img src="../../assets/sports-person.png" alt="Raiting" />
                            <p>{Functions.rat_calc(this.state.temp, this.state.humidity, this.state.precipitation, this.state.windSpeed)}</p>
                        </div>
                    </div>
                </div>
                <div class={style.forecast_container}>
                    {this.state.forecasts &&
                        this.state.forecasts.map((forecast) => (
                            <div class={style.forecast}>
                                <div>{new Date(forecast.dt_txt).toLocaleDateString(undefined, { weekday: 'long' })}</div>
                                <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="Weather icon" />
                                <div>{forecast.main.temp.toFixed(0)}&deg;C</div>
                            </div>
                        ))}
                </div>
                <div class={style.hourly_container}>
                    {this.state.hourlyWeather &&
                        this.state.hourlyWeather.map((hourData) => (
                            <div class={style.hourly}>
                                <div>{new Date(hourData.dt_txt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                                <img src={`http://openweathermap.org/img/wn/${hourData.weather[0].icon}.png`} alt="Weather icon" />
                                <div>{hourData.main.temp.toFixed(0)}&deg;C</div>
                            </div>
                        ))}
                </div>
                
                
            </div>
        );
    }


	// This function is called in checkWeatherData to parse the air quality data from the OpenWeatherMap API response.
	AirQuality = (parsed_json) => {
		var airQuality = parsed_json['list'][0]['main']['aqi'];
	
		this.setState({
			airQuality: airQuality
		});
	}
	//This function is called in checkWeatherData to parse the weather data from the OpenWeatherMap API response and update the state of the component with the weather data.
	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = Math.round(parsed_json['main']['temp']);
		var temp_min_c = Math.round(parsed_json['main']['temp_min']);
		var temp_max_c = Math.round(parsed_json['main']['temp_max']);
		var conditions = parsed_json['weather']['0']['description'];
		var windSpeed = parsed_json['wind']['speed'];
		var windDirection = parsed_json['wind']['deg'];
		var humidity = parsed_json['main']['humidity'];
		var visibility = (parsed_json['visibility'] / 1000).toFixed(1);
        var rain = parsed_json['rain'] && parsed_json['rain']['1h'];
        
        
	
		this.setState({
			locate: location,
			temp: temp_c,
			temp_min: temp_min_c,
			temp_max: temp_max_c,
			cond: conditions,
			windSpeed: windSpeed,
			windDirection: windDirection,
			humidity: humidity,
			visibility: visibility,
            precipitation: rain || 0
            
		});
        this.Alert();
	}
	//This function is called in checkWeatherData to parse the daily and hourly forecast data from the OpenWeatherMap API response and update the state of the component with the forecast data.
    Forecast = (parsed_json) => {
        const dailyForecast = parsed_json['list'].filter((item) => {
            return item.dt_txt.includes('12:00:00');
        }).slice(0, 5);
    
        const hourlyForecast = parsed_json['list'].slice(0, 24);
    
        this.setState({
            forecasts: dailyForecast,
            hourlyWeather: hourlyForecast
        });
    }
   

}	