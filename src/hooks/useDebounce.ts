import {useEffect, useState} from 'react';

const useDebounce = (value: string, delayInMillis: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value.toLowerCase().trim());
    }, delayInMillis);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
