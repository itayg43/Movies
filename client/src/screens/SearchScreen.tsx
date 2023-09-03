import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Searchbar} from 'react-native-paper';

import {Movie, RequestStatus} from '../types';
import moviesService from '../services/moviesService';
import useDebounce from '../hooks/useDebounce';
import SafeView from '../components/SafeView';
import MovieListItem from '../components/MovieListItem';

const SearchScreen = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleGetMoviesBySearchQuery = useCallback(async (query: string) => {
    try {
      setRequestStatus('loading');
      setMovies(await moviesService.getMoviesBySearchQuery(query));
      setRequestStatus('succeded');
    } catch (error) {
      setRequestStatus('failed');
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery === '') {
      setMovies([]);
      return;
    }

    handleGetMoviesBySearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, handleGetMoviesBySearchQuery]);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <Searchbar
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        loading={requestStatus === 'loading'}
      />

      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MovieListItem item={item} onPress={() => null} />
        )}
        initialNumToRender={3}
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

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    rowGap: 10,
  },

  marginBottomSpacer: {
    marginBottom: 10,
  },
});
