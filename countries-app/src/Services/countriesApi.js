const API_BASE = "https://restcountries.com/v3.1";

  export const getCountries = async () => {
    try {
        const response = await fetch(`${API_BASE}/all?fields=name,flags,cca3,continents`);

        if (!response.ok) {
          throw new Error("Error al obtener los países");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en la API:", error);
        throw error;
    }
  }

export const getCountryByname = async (name) => {
    try{

      const response = await fetch(`${API_BASE}/name/${name}?fields=name,flags,capital,region,population,area,continents,languages,currencies,maps`);

      const data = await response.json();
      return data[0];
      
    }catch(error){
      console.log(error);
      throw error;
    }
  }