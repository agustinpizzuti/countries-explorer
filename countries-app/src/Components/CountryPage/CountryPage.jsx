import React from 'react'

//NAVIGATE
import { useParams, useNavigate } from 'react-router-dom'

//REACT
import { useEffect, useState } from 'react'

//SERVICES
import { getCountryByname } from '../../Services/countriesApi'

//STYLE
import "../CountryPage/CountryPage.css";

//FAVORITES
import { addFavorite,removeFavorite,isFavorite } from '../../utils/favorites';

const CountryPage = () => {
    const {name} =useParams();
    const navigate = useNavigate();

    const [country, setCountry] = useState(null);

    const [favorites, setFavorites] = useState(false);
    
    useEffect(() => {
        const fetchCountry = async () => {
            const data = await getCountryByname(name);
            
            setCountry(data);
            setFavorites(isFavorite(data.cca3));
        }

        fetchCountry();
    }, [name]);
   
    if (!country) {
        return <p>Loading...</p>;
    }

   const toggleFavorite = () => {
        if (isFavorite(country.cca3)) {
            removeFavorite(country.cca3);
            setFavorites(false);
        } else {
            addFavorite(country);
            setFavorites(true);
        }
    }
    

  return (
    <div className='country-page'>
        <div className='country-detail-card'>
            <img
                src={country.flags.svg}
                alt={country.name.common}
                width='300'
            />

            <h1>{country.name.common}</h1>

            <p>Capital: {country.capital?.[0]}</p>
            <p>Region: {country.region}</p>
            <p>Population: {country.population}</p>
            <p>Area: {country.area}</p>

            <p>
                Languages: {Object.values(country.languages || {}).join(", ")}
            </p>

            <button onClick={toggleFavorite}>
                {favorites ? "⭐ Remove Favorite" : "☆ Add to Favorites"}
            </button>

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