/**
 * React custom hook to store, retrieve and remove
 * JSON data — syncs across all hook instances in the same tab via CustomEvent,
 * and across browser tabs via the native storage event.
 */

import { useState, useEffect } from "react";

const PREFIX: string = `manna_`;

function useLocalStorage<T>(key: string, initialValue: T) {
  const prefixKey: string = `${PREFIX}${key}`;
  const eventName = `manna-ls-update:${prefixKey}`;

  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(prefixKey);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${prefixKey}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setState] = useState<T>(readValue);

  const setStoredValue = (value: T | ((prev: T) => T)) => {
    const nextValue =
      typeof value === "function"
        ? (value as (prev: T) => T)(storedValue)
        : value;
    try {
      window.localStorage.setItem(prefixKey, JSON.stringify(nextValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${prefixKey}":`, error);
    }
    setState(nextValue);
    // Notify all other hook instances on this page
    window.dispatchEvent(new CustomEvent(eventName));
  };

  const removeStoredValue = () => {
    setStoredValue(initialValue);
  };

  useEffect(() => {
    // Fired when any hook instance on this page calls setStoredValue
    const onSamePageUpdate = () => setState(readValue());
    // Fired when a different browser tab writes to the same key
    const onCrossTabUpdate = (e: StorageEvent) => {
      if (e.key === prefixKey) setState(readValue());
    };

    window.addEventListener(eventName, onSamePageUpdate);
    window.addEventListener("storage", onCrossTabUpdate);
    return () => {
      window.removeEventListener(eventName, onSamePageUpdate);
      window.removeEventListener("storage", onCrossTabUpdate);
    };
  }, []);

  return { storedValue, setStoredValue, removeStoredValue };
}

export default useLocalStorage;
