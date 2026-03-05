const CountryCard = ({ country, nextCountry, prevCountry }) => {

  const handleClick = (e) => {
    const cardWidth = e.currentTarget.offsetWidth;
    const clickX = e.nativeEvent.offsetX;

    if(clickX < cardWidth / 2){
      prevCountry();
    } else {
      nextCountry();
    }
  };

  return (
    <div className="country-card" onClick={handleClick}>
        <h3 className="country-name">{country.name.common}</h3>

        <div className="country-info">
            <img
              className="country-flag"
              src={country.flags.svg}
              alt={country.name.common}
            />

            <div className="country-data">
                <p>Capital: {country.capital?.[0]}</p>
                <p>Continent: {country.continents?.[0]}</p>
                <p>
                  Languages: {Object.values(country.languages ?? {})
                  .slice(0,2)
                  .join(", ")}
                </p>
            </div>
        </div>
    </div>
  )
}

export default CountryCard