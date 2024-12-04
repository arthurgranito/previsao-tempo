import { useState } from "react";

const Container = () => {
    const apiKey = '37548af118b08e733b0c1e4a235a095c';
    const [busca, setBusca] = useState('');
    const [cidade, setCidade] = useState('');
    const [pais, setPais] = useState('');
    const [icone, setIcone] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [descricao, setDescricao] = useState('');
    const [temperaturaMax, setTemperaturaMax] = useState('');
    const [temperaturaMin, setTemperaturaMin] = useState('');
    const [umidade, setUmidade] = useState('');
    const [vento, setVento] = useState('');
    const [alerta, setAlerta] = useState('');
    const [existe, setExiste] = useState(undefined);
    const [carregando, setCarregando] = useState(false)

    const pegarCidade = () => {
        if (busca == '') {
            setExiste(false);
            setAlerta('Digite uma cidade')
        } else {
            setCarregando(true)
            setExiste(undefined)
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(busca)}&appid=${apiKey}&units=metric&lang=pt_br`)
                .then(response => response.json())
                .then(infosCidade => {
                    if (infosCidade.name == undefined) {
                        setExiste(false)
                        setAlerta('Cidade não encontrada')
                    } else {
                        setExiste(true)
                        console.log(infosCidade)
                        setCidade(infosCidade.name);
                        setPais(infosCidade.sys.country)
                        setIcone(infosCidade.weather[0].icon)
                        setTemperatura(((infosCidade.main.temp).toString()).replace('.', ','))
                        setDescricao(infosCidade.weather[0].description)
                        setTemperaturaMax(((infosCidade.main.temp_max).toString()).replace('.', ','))
                        setTemperaturaMin(((infosCidade.main.temp_min).toString()).replace('.', ','))
                        setUmidade(((infosCidade.main.humidity).toString()).replace('.', ','))
                        setVento(infosCidade.wind.speed)
                    }
                })
                .finally(() => {
                    setCarregando(false)
                })
        }
    }

    return (
        <>
            <div className="container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    pegarCidade();
                    setBusca('');
                }}>
                    <i className="fa-solid fa-location-dot"></i>
                    <input type="text" value={busca} onChange={alterado => setBusca(alterado.target.value)} placeholder="Digite sua cidade..." />
                    <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                {
                    carregando && <div className="carregando">
                    <div className="bolinha"></div>
                    </div>
                }

                <h3 className={existe == false ? "alerta ativo" : "alerta"}>{alerta} <i className="fa-solid fa-face-sad-tear"></i></h3>

                <div className={existe == true ? "info active" : "info"}>
                    <h1 className="cidade">{`${cidade}, ${pais}`}</h1>
                    <div className="div_temp">
                        <img src={`https://openweathermap.org/img/wn/${icone}.png`} alt="Ícone do tempo" className="icone" />
                        <div className="textos">
                            <h1 className="temperatura">{temperatura} <sup>C°</sup></h1>
                            <p className="descricao">{descricao}</p>
                        </div>
                    </div>

                    <div className="outrasInfos">
                        <div className="outraInfo">
                            <i className="fa-solid fa-temperature-high" id="temp_max_icon"></i>

                            <div>
                                <h2>Temp. Máx</h2>
                                <p>
                                    {temperaturaMax} <sup>C°</sup>
                                </p>
                            </div>
                        </div>

                        <div className="outraInfo">
                            <i className="fa-solid fa-temperature-low" id="temp_min_icon"></i>

                            <div>
                                <h2>Temp. Mín</h2>
                                <p id="temp_min">
                                    {temperaturaMin} <sup>C°</sup>
                                </p>
                            </div>
                        </div>

                        <div className="outraInfo">
                            <i className="fa-solid fa-droplet" id="temp_umidity_icon"></i>

                            <div>
                                <h2>Umidade</h2>
                                <p id="temp_umidity">
                                    {umidade}%
                                </p>
                            </div>
                        </div>

                        <div className="outraInfo">
                            <i className="fa-solid fa-wind" id="temp_wind_icon"></i>

                            <div>
                                <h2>Vento</h2>
                                <p id="temp_wind">
                                    {vento} km/h
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