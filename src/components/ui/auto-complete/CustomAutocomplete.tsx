import React, { useState, useEffect, useRef } from 'react';

// Define the props interface
interface AutocompleteProps {
  data: string[];
  value: string;
  onChange: (value: string) => void;
  onNoMatchClick: () => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ data, value, onChange, onNoMatchClick }) => {
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle input change and filter data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.trim() === '') {
      setFilteredData([]);
      setIsOpen(false);
    } else {
      const filtered = data.filter(item =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredData(filtered);
      setIsOpen(true);
    }
  };

  // Handle item selection
  const handleItemClick = (item: string) => {
    onChange(item);
    setIsOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        htmlFor="autocomplete-search"
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          id="autocomplete-search"
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={value}
          onChange={handleInputChange}
          required
        />
      </div>
      {isOpen && filteredData.length > 0 && (
        <div
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-full dark:bg-gray-700 absolute mt-1"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {filteredData.map((item, index) => (
              <li key={index}>
                <button
                  type="button"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isOpen && filteredData.length === 0 && value.trim() !== '' && (
        <div className="mt-1">
          <button
            type="button"
            className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
            onClick={onNoMatchClick}
          >
            Add +
          </button>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;