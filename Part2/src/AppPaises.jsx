import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

    const [nombrePais, setNombrePais] = useState(null)
    const [listaPais, setListaPais] = useState(null)
    const [paisSeleccionado, setPaisSeleccionado] = useState(null);

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                setListaPais(response.data)
            })
            .catch(error => {
                console.error("Error al obtener los datos:", error);
            })
    }, [])

    if (!listaPais) {
        return null
    }

    const handleNameChange = (event) => {
        setNombrePais(event.target.value)
        setPaisSeleccionado(null)
    }

    const buscarPaises = nombrePais
        ? listaPais.filter(pais => pais.name.common.toLowerCase().includes(nombrePais.toLowerCase()))
        : []

    const renderizarContenido = () => {
        if (paisSeleccionado) {
            return (
                <div>
                    <h2>{paisSeleccionado.name.common}</h2>
                    <p><strong>Capital:</strong> {paisSeleccionado.capital?.[0] || "No disponible"}</p>
                    <p><strong>Área:</strong> {paisSeleccionado.area} km²</p>
                    <p><strong>Idiomas:</strong></p>
                    <ul>
                        {Object.values(paisSeleccionado.languages || {}).map((idioma, index) => (
                            <li key={index}>{idioma}</li>
                        ))}
                    </ul>
                    <img src={paisSeleccionado.flags.svg} alt={paisSeleccionado.flags.alt} width="150" />
                </div>
            );
        } else if (buscarPaises.length > 10) {
            return <p>Too many matches, specify another filter</p>;
        } else if (buscarPaises.length === 1) {
            const pais = buscarPaises[0];
            return (
                <div>
                    <h2>{pais.name.common}</h2>
                    <p><strong>Capital:</strong> {pais.capital}</p>
                    <p><strong>Área:</strong> {pais.area} km²</p>
                    <p><strong>Idiomas:</strong></p>
                    <ul>
                        {Object.values(pais.languages).map((idioma, index) => (
                            <li key={index}>{idioma}</li>
                        ))}
                    </ul>
                    <img src={pais.flags.svg} alt={pais.flags.alt} width="150" />
                </div>
            );
        } else if (buscarPaises.length > 0) {
            return buscarPaises.map((pais, index) => <p key={index}>{pais.name.common} <button onClick={() => setPaisSeleccionado(pais)}>Show</button></p>);
        }
    }

    return (
        <div>
            find countries: <input onChange={handleNameChange} />
            {renderizarContenido()}
        </div>
    )
}




export default App