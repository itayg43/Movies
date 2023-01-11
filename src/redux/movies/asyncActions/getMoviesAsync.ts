import {AppDispatch} from '../../store';
import {getMovies, getMoviesSuccess, getMoviesFail} from '../moviesSlice';
import tmdbService from '../../../services/tmdbService';
import {ContentCategory} from '../../../clients/tmdbClient';

export const getMoviesAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getMovies());
    const movies = await Promise.all([
      tmdbService.getMoviesByCategory(ContentCategory.nowPlaying),
      tmdbService.getMoviesByCategory(ContentCategory.popular, '2'),
      tmdbService.getMoviesByCategory(ContentCategory.topRated),
      tmdbService.getMoviesByCategory(ContentCategory.upcoming, '3'),
    ]);
    dispatch(
      getMoviesSuccess({
        nowPlaying: movies[0],
        popular: movies[1],
        topRated: movies[2],
        upcoming: movies[3],
      }),
    );
  } catch (error) {
    console.error(error);
    dispatch(getMoviesFail('Could not get movies.'));
  }
};
