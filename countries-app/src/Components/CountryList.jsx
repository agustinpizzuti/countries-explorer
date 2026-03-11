import React, { useEffect, useState } from 'react'
import CountryCard from './CountryCard';
import "../Style.css";
import { getCountries } from '../Services/countriesApi';

const CountryList = () => {

    const [countries, setCountries] =useState([]);
    const [index, setIndex] =useState(0);

    let prevIndex = 0;
    let nextIndex = 0;

    if (countries.length > 0) {
        prevIndex = (index - 1 + countries.length) % countries.length;
        nextIndex = (index + 1) % countries.length;
    }

    const nextCountry = () =>{
        setIndex((prev) => (prev + 1) % countries.length);
    }

    const prevCountry = () =>{
        setIndex((prev) => (prev - 1 + countries.length) % countries.length);
    }

    useEffect(() => {
        const fetchCountries = async () => {
            try{
                const data = await getCountries();
                setCountries(data);
            }catch(error){
                console.log(error);
            }
        }   

        fetchCountries();
    }, []);
    
  return (
   <div className="center">
        {countries.length > 0 && (
            <>
                <CountryCard country={countries[prevIndex]} />

                <CountryCard
                    country={countries[index]}
                    nextCountry={nextCountry}
                    prevCountry={prevCountry}
                />

                <CountryCard country={countries[nextIndex]} />
            </>
        )}
    </div>
  )
}

export default CountryList