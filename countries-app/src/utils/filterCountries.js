export const filterCountries = (countries, continent, search) => {
  let result = countries;

  if (continent !== "All") {
    result = result.filter((c) => c.continents?.includes(continent));
  }

  if (search.trim() !== "") {
    result = result.filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    );
  }

  return result;
};