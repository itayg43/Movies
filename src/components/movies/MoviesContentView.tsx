import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import {useAppSelector} from '../../hooks/useAppSelector';
import {
  selectEntities,
  selectSearchQuery,
  selectSearchResults,
} from '../../redux/movies/moviesSelectors';
import SafeView from '../SafeView';
import MoviesCategoryList from './MoviesCategoryList';
import MoviesSearchResultsList from './MoviesSearchResultsList';

const MoviesContentView = () => {
  const entities = useAppSelector(selectEntities);
  const searchQuery = useAppSelector(selectSearchQuery);
  const searchResults = useAppSelector(selectSearchResults);

  return (
    <SafeView>
      {searchQuery === '' && entities && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic">
          <MoviesCategoryList
            category="Now Playing"
            entities={entities.nowPlaying}
            showLargeImages
          />
          <MoviesCategoryList category="Popular" entities={entities.popular} />
          <MoviesCategoryList
            category="Top Rated"
            entities={entities.topRated}
          />
        </ScrollView>
      )}

      {/** search results */}
      {searchQuery !== '' && searchResults && (
        <MoviesSearchResultsList results={searchResults} />
      )}
    </SafeView>
  );
};

export default MoviesContentView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
});
