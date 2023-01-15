import {Logger} from '../../../helpers/Logger';
import {AppDispatch} from '../../store';
import {
  getMovieDetails,
  getMovieDetailsSuccess,
  getMovieDetailsFail,
} from '../movieSlice';
import tmdbService from '../../../services/tmdbService';

export const getMovieDetailsAsync =
  (id: number) => async (dispatch: AppDispatch, getState: any) => {
    const currentId = getState().movie.entity?.mid;
    if (currentId === id) {
      return;
    }
    try {
      dispatch(getMovieDetails());
      const movie = await tmdbService.getMovieDetailsById(id);
      dispatch(getMovieDetailsSuccess(movie));
    } catch (error) {
      Logger.error(error);
      dispatch(getMovieDetailsFail('Could not get movie details.'));
    }
  };
