import { useState } from "react";

const Container = () => {
    const apiKey = '37548af118b08e733b0c1e4a235a095c';
    const [search, setSearch] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [icon, setIcon] = useState('');
    const [temperature, setTemperature] = useState('');
    const [description, setDescription] = useState('');
    const [maxTemperature, setMaxTemperature] = useState('');
    const [minTemperature, setMinTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [alert, setAlert] = useState('');
    const [exists, setExists] = useState(undefined);
    const [loading, setLoading] = useState(false)

    const getCity = () => {
        if (search === '') {
            setExists(false);
            setAlert('Enter a city')
        } else {
            setLoading(true)
            setExists(undefined)
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(search)}&appid=${apiKey}&units=metric&lang=en`)
                .then(response => response.json())
                .then(cityInfo => {
                    if (cityInfo.name === undefined) {
                        setExists(false)
                        setAlert('City not found')
                    } else {
                        setExists(true)
                        console.log(cityInfo)
                        setCity(cityInfo.name);
                        setCountry(cityInfo.sys.country)
                        setIcon(cityInfo.weather[0].icon)
                        setTemperature(((cityInfo.main.temp).toString()).replace('.', ','))
                        setDescription(cityInfo.weather[0].description)
                        setMaxTemperature(((cityInfo.main.temp_max).toString()).replace('.', ','))
                        setMinTemperature(((cityInfo.main.temp_min).toString()).replace('.', ','))
                        setHumidity(((cityInfo.main.humidity).toString()).replace('.', ','))
                        setWind(cityInfo.wind.speed)
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <>
            <div className="container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    getCity();
                    setSearch('');
                }}>
                    <i className="fa-solid fa-location-dot"></i>
                    <input type="text" value={search} onChange={changed => setSearch(changed.target.value)} placeholder="Enter your city..." />
                    <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                {
                    loading && <div className="loading">
                        <div className="spinner"></div>
                    </div>
                }

                <h3 className={exists === false ? "alert active" : "alert"}>{alert} <i className="fa-solid fa-face-sad-tear"></i></h3>

                <div className={exists === true ? "info active" : "info"}>
                    <h1 className="city">{`${city}, ${country}`}</h1>
                    <div className="temp_div">
                        <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="Weather Icon" className="icon" />
                        <div className="texts">
                            <h1 className="temperature">{temperature} <sup>C°</sup></h1>
                            <p className="description">{description}</p>
                        </div>
                    </div>

                    <div className="otherInfos">
                        <div className="otherInfo">
                            <i className="fa-solid fa-temperature-high" id="temp_max_icon"></i>

                            <div>
                                <h2>Max Temp</h2>
                                <p>
                                    {maxTemperature} <sup>C°</sup>
                                </p>
                            </div>
                        </div>

                        <div className="otherInfo">
                            <i className="fa-solid fa-temperature-low" id="temp_min_icon"></i>

                            <div>
                                <h2>Min Temp</h2>
                                <p id="temp_min">
                                    {minTemperature} <sup>C°</sup>
                                </p>
                            </div>
                        </div>

                        <div className="otherInfo">
                            <i className="fa-solid fa-droplet" id="temp_humidity_icon"></i>

                            <div>
                                <h2>Humidity</h2>
                                <p id="temp_humidity">
                                    {humidity}%
                                </p>
                            </div>
                        </div>

                        <div className="otherInfo">
                            <i className="fa-solid fa-wind" id="temp_wind_icon"></i>

                            <div>
                                <h2>Wind</h2>
                                <p id="temp_wind">
                                    {wind} km/h
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Container;