import {AppDispatch} from '../../store';
import {getData, getDataSuccess, getDataFail} from '../appSlice';
import {getMoviesAsync} from '../../movies/asyncActions/getMoviesAsync';
import {Logger} from '../../../helpers/Logger';

export const getDataAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getData());
    await Promise.all([dispatch(getMoviesAsync())]);
    dispatch(getDataSuccess());
  } catch (error) {
    Logger.error(error);
    dispatch(getDataFail('Could not get data.'));
  }
};
