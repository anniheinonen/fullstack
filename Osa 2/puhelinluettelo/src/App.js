import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Person = ({ person, removeMethod}) => {
    return (
    <li>{person.name} {person.number} <button onClick={()=>removeMethod(person.id, person.name)}>Delete</button> </li>
    )
  }

const PersonForm = ({name, number, nameChange, numberChange}) => {
    return (
        <div>
            <div>
                name: <input 
                value={name}
                onChange={nameChange}
                />
            </div>
            <div>
                number: <input 
                value={number}
                onChange={numberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </div>
    )
}

const People = ({people, removeMethod}) => {
    return (
      <ul>
        {people.map((person) => 
          <Person key={person.id} person={person} removeMethod={removeMethod}/>
        )}
      </ul>
    )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    
    if (persons.some(person => person.name === newName)) { 
      if(window.confirm("Person " + newName + " is already added to the phonebook. Do you want to replace the number?")) {
        const old = persons.find(person => person.name === newName)
        const changed = {...old, number: newNumber}

        personService
        .update(old.id, changed)
        .then(response => {
          setPersons(persons.map(person => person.id !== old.id ? person : response))
        })
        
      }
    } else if (newName !== '') {
    
      personService
        .create(newPerson)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          })

      setMessage(
        `Person '${newName}' was added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    if(window.confirm("Delete " + name)) {
      personService
      .remove(id)
        .then(returnedPerson => {
        setPersons(persons.filter(person=>person.id !== id))
        })
      .catch(error => {
        setError(
          `Person '${name}' has already been removed`
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
    }
  }

  const peopleToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Error message={error} />
      <form onSubmit={addPerson}>  
        <div>
            Filter shown with: <input 
            value={newFilter}
            onChange={handleFilterChange}
            />
        </div>
        <h2>Add a new</h2>
        <PersonForm name={newName} number={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange}/>
      </form>
      <h2>Numbers</h2>
      <People people={peopleToShow} removeMethod={deletePerson}/>
    </div>
  )

}

export default App