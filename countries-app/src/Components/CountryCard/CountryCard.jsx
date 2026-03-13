import { useNavigate } from "react-router-dom"
import "../CountryCard/CountryCard.css";

const CountryCard = ({country}) => {
    const navigate = useNavigate();

    const handelClick = () => {
        navigate(`/country/${country.name.common}`)
    }

    return (
        <div className="country-card" onClick={handelClick}>
            <img
                className="country-flag"
                src={country.flags.svg}
                alt={country.name.common}
            />   
        </div>
    )
}

export default CountryCard;