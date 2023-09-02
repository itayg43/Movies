import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, FlatList, ScrollView, View} from 'react-native';
import {Chip} from 'react-native-paper';

import {Movie, MoviesCategory} from '../types';
import moviesService from '../services/moviesService';
import SafeView from '../components/SafeView';
import MovieListItem from '../components/MovieListItem';

const CATEGORIES: MoviesCategory[] = [
  {
    id: '0',
    key: 'Now Playing',
    value: 'now_playing',
  },
  {
    id: '1',
    key: 'Popular',
    value: 'popular',
  },
  {
    id: '2',
    key: 'Top Rated',
    value: 'top_rated',
  },
  {
    id: '3',
    key: 'Upcoming',
    value: 'upcoming',
  },
];

const MoviesScreen = () => {
  const [category, setCategory] = useState<MoviesCategory>(CATEGORIES[0]);
  const [movies, setMovies] = useState<Movie[]>([]);

  const listRef = useRef<FlatList>(null);

  const handleGetMoviesByCategory = useCallback(async (c: MoviesCategory) => {
    try {
      setMovies(await moviesService.getMoviesByCategory(c));
    } catch (error) {}
  }, []);

  const handleCategoryChange = (c: MoviesCategory) => {
    setCategory(c);
    listRef.current?.scrollToIndex({index: 0});
  };

  useEffect(() => {
    handleGetMoviesByCategory(category);
  }, [handleGetMoviesByCategory, category]);

  return (
    <SafeView contentContainerStyle={styles.container}>
      {/** categories */}
      <ScrollView
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map(c => (
          <Chip
            key={c.id}
            selected={c === category}
            onPress={() => handleCategoryChange(c)}>
            {c.key}
          </Chip>
        ))}
      </ScrollView>

      {/** movie list */}
      <FlatList
        ref={listRef}
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MovieListItem item={item} onPress={() => null} />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
      />
    </SafeView>
  );
};

function ListItemSeparator() {
  return <View style={styles.marginBottomSpacer} />;
}

function ListFooter() {
  return <View style={styles.marginBottomSpacer} />;
}

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    marginHorizontal: 10,
  },

  categoriesContainer: {
    flexGrow: 0,
  },
  categoriesContentContainer: {
    columnGap: 5,
  },

  marginBottomSpacer: {
    marginBottom: 10,
  },
});
