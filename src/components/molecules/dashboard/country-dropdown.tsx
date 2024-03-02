import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
} from '../../atoms/Select';

interface Country {
  name: { common: string };
  // other details can be added for future use if needed
}

export const SelectCountry = () => {
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
    <Select onValueChange={(e) => console.log(e)}>
      <SelectTrigger
        size="md"
        placeholder="Select a country"
        shape="md-rectangle"
      />
      <SelectContent>
        <SelectViewPort>
          {countries.map((country, index) => (
            <SelectItem
              value={country.name.common}
              label={country.name.common}
              key={index}
            />
          ))}
        </SelectViewPort>
      </SelectContent>
    </Select>
  );
};