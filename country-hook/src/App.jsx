import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (nameInput) => {
  const [country, setCountry] = useState(null)
  const [name, setName] = useState(nameInput)

  const handleSetName = (e) => {
    setName(e)
  }

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`).then(res => {
      setCountry(res.data)
    }).catch(err => {
      console.log(`Country called "${name}" not found.`)
      setCountry(null)
    })
  }, [name])

  return {country, handleSetName}
}

const Country = ({ country }) => {
  const c = country.country
  if (!c) {
    return <div>Country not found...</div>
  }

  return (
    <div>
      <h3>{c.name.common} </h3>
      <div>capital {c.capital} </div>
      <div>population {c.population}</div> 
      <img src={c.flag} height='100' alt={`flag of ${c.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const country = useCountry(nameInput.value)

  const fetch = (e) => {
    e.preventDefault()
    country.handleSetName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App