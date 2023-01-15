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
      const results = await Promise.all([
        tmdbService.getMovieDetailsById(id),
        tmdbService.getMovieRecommendationsById(id),
      ]);
      dispatch(
        getMovieDetailsSuccess({
          entity: results[0],
          recommendedEntities: results[1],
        }),
      );
    } catch (error) {
      Logger.error(error);
      dispatch(getMovieDetailsFail('Could not get movie details.'));
    }
  };
