import React, {useEffect} from 'react';

import {useAppDispatch} from './src/hooks/useAppDispatch';
import {getMoviesAsync} from './src/redux/movies/asyncActions/getMoviesAsync';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMoviesAsync());
  }, [dispatch]);

  return <></>;
};

export default App;
