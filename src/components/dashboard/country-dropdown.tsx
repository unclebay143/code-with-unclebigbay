import React, { useState, useEffect } from 'react';

interface Country {
  name: { common: string };
  // other details can be added for future use if needed
}

export const CountryDropdown = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const sortedCountries = data.sort((a: Country, b: Country) =>
          a.name.common.localeCompare(b.name.common),
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <select className="p-2 border bg-slate-100 rounded-md outline-none">
      <option value="country" className="hidden ">
        Select your current country of residence...
      </option>
      {countries.map((country, index) => (
        <option value={country.name.common} key={index}>
          {country.name.common}
        </option>
      ))}
    </select>
  );
};
