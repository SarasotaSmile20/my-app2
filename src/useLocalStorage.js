// src/useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Retrieve stored value or use initialValue
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(parsedValue);

  useEffect(() => {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
