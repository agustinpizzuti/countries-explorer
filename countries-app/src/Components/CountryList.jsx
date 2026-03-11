import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import { getCountries } from "../Services/countriesApi";
import "../Style.css";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continent, setContinent] = useState("All");
  const [search, setSearch] = useState("");
  
  const [page, setPage] = useState(0);

  const countriesPerPage = 30;

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setCountries(data);
      setFilteredCountries(data);
    };

    fetchCountries();
  }, []);

  const start = page * countriesPerPage;
  const end = start + countriesPerPage;

  const currentCountries = filteredCountries.slice(start, start + countriesPerPage);

  const nextPage = () => {
    if (end < filteredCountries.length) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const sortAlphabetically = () =>{
    const sorted = [...filteredCountries].sort((a,b) => 
      a.name.common.localeCompare(b.name.common)
    )

    setFilteredCountries(sorted);
  }

  return (
    <div className="countries-container">

    <button onClick={sortAlphabetically} className="sort-btn">
        Sort A-Z
      </button>

      <select
          value={continent}
          onChange={(e) => {
            const selected = e.target.value;
            setContinent(selected);

            let filtered = countries;

            if (selected !== "All") {
              filtered = countries.filter((country) =>
                country.continents?.includes(selected)
              )
            }

            setFilteredCountries(filtered);
          }}
            
          className="filter-select"
      >
          <option value="All">All Continents</option>
          <option value="Africa">Africa</option>
          <option value="South America">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
      </select>
      
      <input
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);

            if (value.trim() !== "") {
              const result = countries.filter((c) =>
                c.name.common.toLowerCase().includes(value.toLowerCase())
              );

              setFilteredCountries(result);
              setPage(0);
            } else {
              // vuelve al filtro por continente
              if (continent === "All") {
                setFilteredCountries(countries);
              } else {
                const result = countries.filter((c) =>
                  c.continents?.includes(continent)
                );
                setFilteredCountries(result);
              }

              setPage(0);
            }
          }}
          className="search-input"
/>

      <div className="countries-grid">
        {currentCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>

      <div className="navigation">
        <button onClick={prevPage}>⬅</button>
        <button onClick={nextPage}>➡</button>
      </div>
    </div>
  );
};

export default CountryList;