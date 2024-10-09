/**
* Custom React hook to..
* add values, remove values, 
* and clear the object from localStorage
* Need to specify key field when using this hook
*/
import { useState, useEffect } from 'react';

function useLocalStorageObject(key: string, initialValue = {}) {
  // Get the initial value from localStorage or use the provided initialValue
  const [storedObject, setStoredObject] = useState<unknown>(() => {
    try {
      const item = window.localStorage?.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Update localStorage when storedObject changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedObject));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedObject]);

  // Function to add a key-value pair to the object
  const addValue = (itemKey: string, itemValue: unknown) => {
    setStoredObject((prevObject: unknown) => ({
      ...(prevObject as Object),
      [itemKey]: itemValue
    }));
  };

  // Function to remove a key-value pair from the object
  const removeValue = (itemKey: string) => {
    setStoredObject((prevObject: unknown) => {
      const newObject = { ...(prevObject as Object) };
      delete newObject[itemKey];
      return newObject;
    });
  };

  // Function to clear the entire object from localStorage
  const clearObject = () => {
    setStoredObject({});
    window.localStorage.removeItem(key);
  };

  return { storedObject, addValue, removeValue, clearObject };
}

export default useLocalStorageObject;
