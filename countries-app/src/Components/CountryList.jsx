import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import { getCountries } from "../Services/countriesApi";
import { paginate } from "../utils/pagination";

import "../Style.css";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continent, setContinent] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const countriesPerPage = 30;

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setCountries(data);
      setFilteredCountries(data);
    };
    fetchCountries();
  }, []);

  // Filtrar por continente y búsqueda
  useEffect(() => {
    let result = countries;

    if (continent !== "All") {
      result = result.filter((c) => c.continents?.includes(continent));
    }

    if (search.trim() !== "") {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCountries(result);
    setPage(1); // resetear página al filtrar
  }, [countries, continent, search]);

  // Paginación
  const { pagedItems: currentCountries, currentPage, totalPages } = paginate(
    filteredCountries,
    page,
    countriesPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const sortAlphabetically = () => {
    const sorted = [...filteredCountries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    setFilteredCountries(sorted);
  };

  return (
    <div className="countries-container">
      <button onClick={sortAlphabetically} className="sort-btn">
        Sort A-Z
      </button>

      <select
        value={continent}
        onChange={(e) => setContinent(e.target.value)}
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
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="countries-grid">
        {currentCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>

      <div className="navigation">
        <button onClick={prevPage} disabled={currentPage === 1}>
          ⬅
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          ➡
        </button>
      </div>
    </div>
  );
};

export default CountryList;