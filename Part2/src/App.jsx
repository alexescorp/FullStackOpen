import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .consultarPersonas()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtro, setFiltro] = useState('')
  const [notificacionMessage, setNotificacionMessage] = useState(null)
  const [notificacionTipo, setNotificacionTipo] = useState(null)

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value)
  }

  const filtraPersonas = persons.filter((person) => person.name.toLowerCase().includes(filtro.toLowerCase()))

  const addPersons = (event) => {
    event.preventDefault()  //evita la acción predeterminada de enviar un formulario

    const existe = persons.some(p => p.name.toLowerCase() === newName.toLowerCase())

    if (existe) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const persona = persons.find(n => n.name === newName)
        const newObject = { ...persona, number: newNumber }
        personService
          .updatePerson(persona.id, newObject)
          .then(response => {
            setNotificacionMessage(
              `Changed '${newName}'`
            )
            setNotificacionTipo('ok')
            setTimeout(() => {
              setNotificacionMessage(null)
            }, 4000)
            setPersons(persons.map(p => p.id !== response.id ? p : response))
          })
          .catch(error => {
            setNotificacionMessage(
              `Information of '${newName}' has already been removed fromm server`
            )
            setNotificacionTipo('error')
            setTimeout(() => {
              setNotificacionMessage(null)
            }, 4000)
          })
      } else {
        return
      }
    } else {

      const personaObjeto = { name: newName, number: newNumber }

      personService
        .createPerson(personaObjeto)
        .then(response => {
          setNotificacionMessage(
            `Added '${newName}'`
          )
          setNotificacionTipo('ok')
          setTimeout(() => {
            setNotificacionMessage(null)
          }, 4000)
          setPersons(persons.concat(response))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const borrarPersons = (persona) => {
    if (window.confirm(`¿Delete ${persona.name}?`)) {
      personService
        .deletePerson(persona.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== response.id))
        })
      // .catch(error => {
      //   alert(`Error al eliminar a ${persona.name}: ${error}`)
      // })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificacionMessage} tipoNotificacion={notificacionTipo} />
      <Filter handleChange={handleFiltroChange} />

      <h2>add a new</h2>
      <PersonForm handleSubmit={addPersons} valorNombre={newName} handleNombreChange={handlePersonChange} valorNumero={newNumber} handleNumeroChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personasFiltradas={filtraPersonas} deletePersons={borrarPersons} />

    </div>
  )
}

const Filter = ({ handleChange }) => {
  return (
    <div>
      filter show with: <input placeholder='Buscar ..' onChange={handleChange} />
    </div>
  )
}

const PersonForm = ({ handleSubmit, valorNombre, handleNombreChange, valorNumero, handleNumeroChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={valorNombre} placeholder='Ingrese un nombre ..' onChange={handleNombreChange} />
      </div>
      <div>
        number: <input value={valorNumero} placeholder='Ingrese un telefono ..' onChange={handleNumeroChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personasFiltradas, deletePersons }) => {
  return (
    <div>
      <ul>
        {personasFiltradas.map((personasLista) => (
          <li key={personasLista.name}>
            {personasLista.name} | {personasLista.number}
            <button onClick={() => deletePersons(personasLista)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Notification = ({ message, tipoNotificacion }) => {
  if (message === null) {
    return null
  }

  if (tipoNotificacion === 'ok') {
    return (
      <div className="right">
        <p>{message}</p>
      </div>
    )
  } else {
    return (
      <div className="error">
        <p>{message}</p>
      </div>
    )
  }
}

export default App