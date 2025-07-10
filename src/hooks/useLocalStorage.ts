import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  console.log(`useLocalStorage: initializing with key=${key}`);

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      console.log(`useLocalStorage: retrieved value for key=${key}`, item ? 'exists' : 'null');
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage: error reading from localStorage for key=${key}`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      console.log(`useLocalStorage: setting value for key=${key}`, value);
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      console.log(`useLocalStorage: value saved to localStorage for key=${key}`);
    } catch (error) {
      console.error(`useLocalStorage: error saving to localStorage for key=${key}`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== JSON.stringify(storedValue)) {
        console.log(`useLocalStorage: storage event for key=${key}`, e.newValue);
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`useLocalStorage: error parsing storage event for key=${key}`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, storedValue, initialValue]);

  return [storedValue, setValue];
}
