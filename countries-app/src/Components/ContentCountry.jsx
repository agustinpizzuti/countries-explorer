import React, { useEffect, useState } from 'react'

const ContentCountry = () => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        
       fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then(response => response.json())
      .then((data) => {setCountries(data)})
    }, []);
    

  return (
    <div>
        {countries.map(c =>
            <h1>{c.name.common} </h1>
        )}
    </div>
  )
}

export default ContentCountry