import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectEntities} from '../redux/movies/moviesSelectors';
import SafeView from './SafeView';
import MoviesCategoryList from './MoviesCategoryList';

const MoviesContentView = () => {
  const dispatch = useAppDispatch();

  const entities = useAppSelector(selectEntities);

  return (
    <SafeView>
      {entities && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <MoviesCategoryList
            category="Now Playing"
            entities={entities.nowPlaying}
            isLargeImages
          />
          <MoviesCategoryList category="Popular" entities={entities.popular} />
          <MoviesCategoryList
            category="Top Rated"
            entities={entities.topRated}
          />
          <MoviesCategoryList
            category="Upcoming"
            entities={entities.upcoming}
          />
        </ScrollView>
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
