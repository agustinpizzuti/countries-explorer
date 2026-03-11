const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,capital,continents,languages,cca3";

  export const getCountries = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Error al obtener los países");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error en la API:", error);
        throw error;
    }
  }

export const getCountryByname = async (name) => {
    try{

      const response = await fetch(`${API_URL}/name/${name}`);

      const data = await response.json();
      return data;
      
    }catch(error){
      console.log(error);
      throw error;
    }
  }