import React, { useState, useEffect } from "react";
import "./App.css";

function CountryApp() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="CountryApp">
      <input
        type="text"
        placeholder="Search Country..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="countryList">
        {filteredCountries.map((country) => (
          <div key={country.cca2} className="countryCard">
            <img src={country.flags.svg} alt={country.name.common} />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryApp;
