import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '39-44-532352'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

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
        {persons.map(note => <li key={note.name}> {note.name} | {note.number} </li>)}
      </ul>
    </div>
  )
}

export default App