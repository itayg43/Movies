import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, FlatList, ScrollView, View, Text} from 'react-native';
import {Chip, Searchbar} from 'react-native-paper';

import {Movie, MoviesCategory, RequestStatus} from '../types';
import moviesService from '../services/moviesService';
import useDebounce from '../hooks/useDebounce';
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
  const listRef = useRef<FlatList>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const [category, setCategory] = useState<MoviesCategory>(CATEGORIES[0]);
  const [disableCategories, setDisableCategories] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const [getBySearchQueryStatus, setGetBySearchQueryStatus] =
    useState<RequestStatus>('idle');

  const handleGetMoviesByCategory = useCallback(async (c: MoviesCategory) => {
    try {
      setMovies(await moviesService.getMoviesByCategory(c));
    } catch (error) {}
  }, []);

  const handleGetMoviesBySearchQuery = useCallback(async (query: string) => {
    try {
      setGetBySearchQueryStatus('loading');
      setSearchResults(await moviesService.getMoviesBySearchQuery(query));
      setGetBySearchQueryStatus('succeded');
    } catch (error) {
      setGetBySearchQueryStatus('failed');
    }
  }, []);

  const handleCategoryChange = (c: MoviesCategory) => {
    setCategory(c);
    listRef.current?.scrollToIndex({index: 0});
  };

  useEffect(() => {
    setDisableCategories(false);
    handleGetMoviesByCategory(category);
  }, [category, handleGetMoviesByCategory]);

  useEffect(() => {
    if (debouncedSearchQuery === '') {
      setDisableCategories(false);
      setSearchResults([]);
      return;
    }

    setDisableCategories(true);
    handleGetMoviesBySearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, handleGetMoviesBySearchQuery]);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <Searchbar
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        loading={getBySearchQueryStatus === 'loading'}
      />

      {/** categories */}
      <ScrollView
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map(c => (
          <Chip
            key={c.id}
            textStyle={styles.categoryText}
            selected={c === category}
            onPress={() => handleCategoryChange(c)}
            disabled={disableCategories}
            compact>
            {c.key}
          </Chip>
        ))}
      </ScrollView>

      {/** movie list */}
      <FlatList
        ref={listRef}
        data={debouncedSearchQuery !== '' ? searchResults : movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MovieListItem item={item} onPress={() => null} />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={
          debouncedSearchQuery !== '' && getBySearchQueryStatus === 'succeded'
            ? ListEmptySearchResultsPlaceholder
            : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeView>
  );
};

function ListEmptySearchResultsPlaceholder() {
  return (
    <View style={styles.listEmptySearchResultsPlaceholderContainer}>
      <Text>No Results...</Text>
    </View>
  );
}

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
  categoryText: {
    textAlign: 'center',
    paddingVertical: 3,
  },

  listEmptySearchResultsPlaceholderContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  marginBottomSpacer: {
    marginBottom: 10,
  },
});
