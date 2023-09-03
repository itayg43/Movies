import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
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
      setRequestStatus('idle');
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
        ListEmptyComponent={
          requestStatus === 'succeded' && movies.length === 0
            ? ListEmptyPlaceholder
            : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeView>
  );
};

function ListEmptyPlaceholder() {
  return (
    <View style={styles.listEmptyPlaceholderContainer}>
      <Text>No Results</Text>
    </View>
  );
}

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

  listEmptyPlaceholderContainer: {
    marginTop: 30,
    alignItems: 'center',
  },

  marginBottomSpacer: {
    marginBottom: 10,
  },
});
