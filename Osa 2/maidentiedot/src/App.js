import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ country }) => {
    return (
      <li>  
        {country.name}
      </li>     
    )
  }

const Language = ({language}) => {
  return (
    <li>  {language}</li>
    )
}

const AllInfo = ({name, capital, population, languages, flag}) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Capital {capital}</p>
      <p>Population {population}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) =>
          <Language key={language.iso639_1} language={language.name}/>
        )}
      </ul>
      <img src={flag} alt={name} width="500" />
    </div>
  )
}

const Countries = ({countries}) => {
  if(countries.length === 1) {
    return (
      <AllInfo name={countries[0].name} capital={countries[0].capital} population={countries[0].population} languages={countries[0].languages} flag={countries[0].flag}/>
    )

  } else if(countries.length <= 10) {
    return (
      <ul>
      {countries.map((country, i) => 
        <Country key={country.name} country={country} />
      )}
    </ul>
    )
  } else {
    return (
      <p>Too many matches, specify another filter.</p>
    )
  }
    
}

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ newCountry, setNewCountry] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  const countriesToShow = newCountry === ''
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(newCountry))

  return (
    <div>
      <form>  
        <div>
            Find countries: <input 
            value={newCountry}
            onChange={handleCountryChange}
            />
        </div>
      </form>
      <Countries countries={countriesToShow}/>
    </div>
  )

}

export default App