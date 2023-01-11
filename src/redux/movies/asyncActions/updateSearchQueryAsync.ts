import {AppDispatch} from '../../store';
import {updateSearchQuery, resetSearchResultsValue} from '../moviesSlice';
import {getSearchResultsAsync} from './getSearchResultsAsync';

export const updateSearchQueryAsync =
  (query: string) => async (dispatch: AppDispatch) => {
    if (query === '') {
      dispatch(updateSearchQuery(query));
      dispatch(resetSearchResultsValue());
      return;
    }
    await Promise.all([dispatch(updateSearchQuery(query))]);
    dispatch(getSearchResultsAsync());
  };
