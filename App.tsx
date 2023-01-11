import React, {useEffect} from 'react';

import {useAppDispatch} from './src/hooks/useAppDispatch';
import {useAppSelector} from './src/hooks/useAppSelector';
import {getDataAsync} from './src/redux/app/asyncActions/getDataAsync';
import {selectStatus, selectErrorMessage} from './src/redux/app/appSelectors';

const App = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectErrorMessage);

  useEffect(() => {
    dispatch(getDataAsync());
  }, [dispatch]);

  return <></>;
};

export default App;
