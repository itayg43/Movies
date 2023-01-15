import {AppDispatch} from '../../store';
import {
  getSearchResults,
  getSearchResultsSuccess,
  getSearchResultsFail,
} from '../moviesSlice';
import tmdbService from '../../../services/tmdbService';
import {Logger} from '../../../helpers/Logger';

export const getSearchResultsAsync =
  () => async (dispatch: AppDispatch, getState: any) => {
    const query = getState().movies.searchQuery;
    try {
      dispatch(getSearchResults());
      const results = await tmdbService.getMoviesByQuery(query);
      dispatch(getSearchResultsSuccess(results));
    } catch (error) {
      Logger.error(error);
      dispatch(getSearchResultsFail('Could not get search results.'));
    }
  };
