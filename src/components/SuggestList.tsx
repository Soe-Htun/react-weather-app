import React from "react";

interface SuggestListProps {
  suggestions: string[];
  onSelect: (city: string) => void;
}

const SuggestList: React.FC<SuggestListProps> = ({ suggestions, onSelect }) => {
  if (!suggestions.length) return null;

  return (
    <ul className="absolute top-full left-0 right-0 bg-white border rounded shadow z-20 mt-1 max-h-60 overflow-y-auto">
      {suggestions.map((city, idx) => (
        <li
          key={idx}
          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
          onClick={() => onSelect(city)}
        >
          {city}
        </li>
      ))}
    </ul>
  );
};

export default SuggestList;
