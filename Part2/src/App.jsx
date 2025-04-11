import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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
      <div>
        filter show with: <input placeholder='Buscar ..' onChange={handleFiltroChange} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPersons}>
        <div>
          name: <input value={newName} placeholder='Ingrese un nombre ..' onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} placeholder='Ingrese un telefono ..' onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {filtraPersonas.map((person) => (
          <li key={person.name}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App