import {useEffect, useState} from 'react';

const useDebounce = (value: string, delayInMillis = 300) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delayInMillis);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delayInMillis]);

  return debouncedValue;
};

export default useDebounce;
