import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtro, setFiltro] = useState('')

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
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personaObjeto = { name: newName, number: newNumber }

    setPersons(persons.concat(personaObjeto))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleChange={handleFiltroChange} />

      <h2>add a new</h2>
      <PersonForm handleSubmit={addPersons} valorNombre={newName} handleNombreChange={handlePersonChange} valorNumero={newNumber} handleNumeroChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personasFiltradas={filtraPersonas} />

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

const Persons = ({ personasFiltradas }) => {
  return (
    <div>
      <ul>
        {personasFiltradas.map((personasLista) => (
          <li key={personasLista.name}>
            {personasLista.name} - {personasLista.number}
          </li>
        ))}
      </ul>
    </div>
  )
}


export default App