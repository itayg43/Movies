import {AppDispatch} from '../../store';
import {getData, getDataSuccess, getDataFail} from '../appSlice';
import {getMoviesAsync} from '../../movies/asyncActions/getMoviesAsync';

export const getDataAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getData());
    await Promise.all([dispatch(getMoviesAsync())]);
    dispatch(getDataSuccess());
  } catch (error) {
    console.error(error);
    dispatch(getDataFail('Could not get data.'));
  }
};
