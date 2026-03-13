import React, { useEffect, useState } from "react";

//COMPONENTS
import CountryCard from "../CountryCard/CountryCard";
import Pagination from "../Pagination/Pagination";

//SERVICES
import { getCountries } from "../../Services/countriesApi";

//SORT AND FILTER
import { sortCountries } from "../../utils/sortCountries";
import { filterCountries } from "../../utils/filterCountries";

//PAGINATED
import { usePagination } from "../../hooks/usePagination";
import { paginate } from "../../utils/pagination";

//FAVORITES
import {getFavorites} from "../../utils/favorites";

//STYLE
import "../CountryList/CountryList.css";

//ANIMACION
import {motion} from "framer-motion";

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continent, setContinent] = useState("All");
  const [search, setSearch] = useState("");

  const {page, nextPage, prevPage,resetPage} = usePagination();
  const countriesPerPage = 30;

  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setCountries(data);
      setFilteredCountries(data);
    };
    fetchCountries();
  }, []);

  //FILTER BY CONTINENT
  useEffect(() => {
    let result = filterCountries(countries, continent, search);
    
    if(showFavorites){
      const favorites = getFavorites().map((f) => f.cca3);
      result = result.filter((country) => favorites.includes(country.cca3));
    }


    setFilteredCountries(result);
    resetPage(); // RESET 
  }, [countries, continent, search, showFavorites]);

  //PAGINATED
  const { pagedItems: currentCountries, currentPage, totalPages } = paginate(
    filteredCountries,
    page,
    countriesPerPage
  );

  const handleNextPage = () =>{
    if(currentPage < totalPages){
      nextPage();
    }
  }

  //SORT
  const sortAlphabetically = () => {
    const sorted = sortCountries(filteredCountries);
    setFilteredCountries(sorted);
  };

  return (
    <div className="countries-container">

      <div className="filters-container">
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

        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="favorite-filter-btn"
        >
          {showFavorites ? "Show All Countries" : "Show Favorites ⭐"}
        </button>
      </div>
      

      <div className="countries-grid">
        {currentCountries.map((country) => (
          <motion.div
            key={country.name.common}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y:0}}
            transition={{duration: 0.5}}
          >
          
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
          >
            <CountryCard key={country.cca3} country={country} />
          </motion.div>
        </motion.div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={handleNextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default CountryList;