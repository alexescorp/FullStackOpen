import { useState, useEffect } from 'react'
import axios from 'axios'
import climaService from './services/clima'

const App = () => {
    const [nombrePais, setNombrePais] = useState('')
    const [oListaPais, setObjListaPais] = useState(null)
    const [oPaisSeleccionado, setObjPaisSeleccionado] = useState(null)
    const [oClimaPais, setObjClimaPais] = useState(null)
    const [paisesFiltrados, setPaisesFiltrados] = useState([])

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                setObjListaPais(response.data)
            })
            .catch(error => {
                console.error("Error al obtener los datos:", error)
            })
    }, [])


    // Filtrar países cuando cambia el nombre o la lista completa
    useEffect(() => {
        if (nombrePais) {
            const filtrados = oListaPais.filter(pais =>
                pais.name.common.toLowerCase().includes(nombrePais.toLowerCase())
            )
            setPaisesFiltrados(filtrados)
        } else {
            setPaisesFiltrados([])
        }
    }, [nombrePais, oListaPais])


    // Solo obtener clima si no hay país seleccionado manualmente y hay exactamente 1 país
    useEffect(() => {
        if (!oPaisSeleccionado && paisesFiltrados.length === 1) {
            const pais = paisesFiltrados[0]
            climaService
                .getClimaAll(pais.capital?.[0], pais.cca2)
                .then(respuesta => setObjClimaPais(respuesta))
                .catch(error => console.log(error))
        }
    }, [paisesFiltrados, oPaisSeleccionado])

    if (!oListaPais) { return }

    const handleNameChange = (event) => {
        setNombrePais(event.target.value)
        setObjPaisSeleccionado(null)
        setObjClimaPais(null)
    }

    // Obtener clima para el país seleccionado manualmente
    const handleSelectCountry = (pais) => {
        setObjPaisSeleccionado(pais)
        setObjClimaPais(null)
        climaService
            .getClimaAll(pais.capital?.[0], pais.cca2)
            .then(respuesta => setObjClimaPais(respuesta))
            .catch(error => console.log(error))
    }

    const renderizarContenido = () => {
        if (oPaisSeleccionado) {
            return (
                <DetallePais
                    pais={oPaisSeleccionado}
                    clima={oClimaPais}
                />
            )
        } else if (paisesFiltrados.length > 10) {
            return <p>Too many matches, specify another filter</p>
        } else if (paisesFiltrados.length === 1) {
            return <DetallePais pais={paisesFiltrados[0]} clima={oClimaPais} />
        } else if (paisesFiltrados.length > 0) {
            return paisesFiltrados.map((pais) => (
                <p key={pais.cca3}>
                    {pais.name.common}
                    <button onClick={() => handleSelectCountry(pais)}>Show</button>
                </p>
            ))
        }
        return null
    }

    return (
        <div>
            find countries: <input
                value={nombrePais}
                onChange={handleNameChange}
            />
            {renderizarContenido()}
        </div>
    )
}

// Componente separado para mostrar los detalles del país
const DetallePais = ({ pais, clima }) => {
    return (
        <div>
            <h2>{pais.name.common}</h2>
            <p><strong>Capital:</strong> {pais.capital?.[0] || "No disponible"}</p>
            <p><strong>Área:</strong> {pais.area} km²</p>
            <p><strong>Idiomas:</strong></p>
            <ul>
                {Object.values(pais.languages || {}).map((idioma, index) => (
                    <li key={index}>{idioma}</li>
                ))}
            </ul>
            <img src={pais.flags.svg} alt={pais.flags.alt} width="150" />

            {clima && (
                <div>
                    <h3>Weather in {pais.name.common}</h3>
                    <p><strong>Temperatura:</strong> {clima.main.temp}°C</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
                        alt={clima.weather[0].description}
                        width="100"
                    />
                    <p><strong>Wind:</strong> {clima.wind.speed} m/s</p>
                </div>
            )}
        </div>
    )
}

export default App