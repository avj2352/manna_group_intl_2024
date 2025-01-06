/**
 * React custom hook to store, retrieve and remove
 * JSON data
 */

import { useState, useEffect } from "react";

const PREFIX: string = `manna_`;

function useLocalStorage<T>(key: string, initialValue: T) {
  const prefixKey: string = `${PREFIX}${key}`;

  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(prefixKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${prefixKey}":`, error);
      return initialValue;
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue());

  const removeStoredValue = () => {
    setStoredValue(initialValue);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(prefixKey, JSON.stringify(storedValue));
    }
  }, [storedValue]);

  return { storedValue, setStoredValue, removeStoredValue };
}

export default useLocalStorage;
