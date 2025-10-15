import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuggestList from "./SuggestList";
import { fetchCitySuggestions } from "../services/weatherService";
import BasicIcons from "./UI/BasicIcons"
const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const result = await fetchCitySuggestions(value);
        setSuggestions(result);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (selectedCity: string) => {
    setQuery(selectedCity);
    setSuggestions([]);
    navigate(`/weather/${selectedCity.split(",")[0]}`);
  };

  const clearInput = () => {
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mt-3">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <BasicIcons name="search"  />
        </div>

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search city..."
          className="w-full border rounded-2xl px-12 py-2 text-lg shadow"
        />

        {query && (
          <button
            onClick={clearInput}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <BasicIcons name="clear" />
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <SuggestList suggestions={suggestions} onSelect={handleSelect} />
      )}
    </div>

  );
};

export default SearchBar;
