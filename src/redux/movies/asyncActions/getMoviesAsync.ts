import {AppDispatch} from '../../store';
import {getMovies, getMoviesSuccess, getMoviesFail} from '../moviesSlice';
import tmdbService from '../../../services/tmdbService';
import {ContentCategory} from '../../../clients/tmdbClient';
import {Logger} from '../../../helpers/Logger';

export const getMoviesAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getMovies());
    const movies = await Promise.all([
      tmdbService.getMoviesByCategory(ContentCategory.nowPlaying),
      tmdbService.getMoviesByCategory(ContentCategory.popular, '2'),
      tmdbService.getMoviesByCategory(ContentCategory.topRated),
    ]);
    dispatch(
      getMoviesSuccess({
        nowPlaying: movies[0],
        popular: movies[1],
        topRated: movies[2],
      }),
    );
  } catch (error) {
    Logger.error(error);
    dispatch(getMoviesFail('Could not get movies.'));
  }
};
