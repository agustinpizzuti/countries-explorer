import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCountryByname } from '../Services/countriesApi'
import "../CListStyle.css";

const CountryPage = () => {
    const {name} =useParams();
    const navigate = useNavigate();

    const [country, setCountry] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
            const data = await getCountryByname(name);
            console.log(data);
            
            setCountry(data);
        }

        fetchCountry();
    }, [name]);
   
    if (!country) {
        return <p>Loading...</p>;
    }

  return (
    <div className='country-page'>
        <div className='country-detail-card'>
            <img
            src={country.flags.svg}
            alt={country.name.common}
            width="300"
            />

            <h1>{country.name.common}</h1>

            

            <p>Capital: {country.capital?.[0]}</p>
            <p>Region: {country.region}</p>
            <p>Population: {country.population}</p>
            <p>Area: {country.area}</p>

            <p>
                Languages: {Object.values(country.languages || {}).join(", ")}
            </p>

            <button
            className="back-btn"
            onClick={() => navigate("/")}
            >
            ← Back to countries
            </button>
        </div>
        
    </div>
  )
}

export default CountryPage;