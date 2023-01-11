import {AppDispatch} from '../../store';
import {
  getSearchResults,
  getSearchResultsSuccess,
  getSearchResultsFail,
} from '../moviesSlice';
import tmdbService from '../../../services/tmdbService';

export const getSearchResultsAsync =
  () => async (dispatch: AppDispatch, getState: any) => {
    const query = getState().movies.searchQuery;
    try {
      dispatch(getSearchResults());
      const results = await tmdbService.getMoviesByQuery(query);
      dispatch(getSearchResultsSuccess(results));
    } catch (error) {
      console.error(error);
      dispatch(getSearchResultsFail('Could not get search results.'));
    }
  };
