export const getFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (country) => {
  const favorites = getFavorites();

  const exists = favorites.some((c) => c.cca3 === country.cca3);

  if (!exists) {
    const updated = [...favorites, country];
    localStorage.setItem("favorites", JSON.stringify(updated));
  }
};

export const removeFavorite = (countryCode) => {
  const favorites = getFavorites();

  const updated = favorites.filter((c) => c.cca3 !== countryCode);

  localStorage.setItem("favorites", JSON.stringify(updated));
};

export const isFavorite = (countryCode) => {
  const favorites = getFavorites();

  return favorites.some((c) => c.cca3 === countryCode);
};