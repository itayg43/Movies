import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {MoviesScreenNavigationProp} from '../navigators/MoviesStackNavigator';
import {
  useAppDispatch,
  useAppSelector,
  useDebounce,
  useIsFirstRender,
} from '../hooks';
import moviesActions from '../redux/movies/moviesAsyncActions';
import {updateMoviesSearchQuery} from '../redux/movies/moviesSlice';
import {RequestStatus} from '../types';
import {
  selectMoviesMessage,
  selectMovies,
} from '../redux/movies/moviesSelectors';
import SafeView from '../components/SafeView';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import MovieListItem from '../components/MovieListItem';

const MoviesScreen = () => {
  const isFirstRender = useIsFirstRender();

  const navigation = useNavigation<MoviesScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const movies = useAppSelector(selectMovies);
  const moviesMessage = useAppSelector(selectMoviesMessage);

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const handleGetMovies = useCallback(async () => {
    try {
      setRequestStatus('loading');
      await dispatch(moviesActions.getMovies()).unwrap();
      setRequestStatus('succeded');
    } catch (error) {
      setRequestStatus('failed');
    }
  }, [dispatch]);

  const handleMovieListItemPress = (id: number) => {
    navigation.navigate('movieDetailsScreen', {
      id,
    });
  };

  useEffect(() => {
    handleGetMovies();
  }, [handleGetMovies]);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    dispatch(updateMoviesSearchQuery(debouncedSearchQuery));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, debouncedSearchQuery]);

  return (
    <SafeView>
      {requestStatus === 'loading' && (
        <LoadingView message="Loading Movies..." />
      )}

      {requestStatus === 'succeded' && (
        <View style={styles.contentContainer}>
          <Searchbar
            mode="bar"
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <FlatList
            data={movies}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <MovieListItem
                item={item}
                onPress={() => handleMovieListItemPress(item.id)}
              />
            )}
            ItemSeparatorComponent={ListSpacer}
            ListFooterComponent={ListSpacer}
            ListEmptyComponent={
              debouncedSearchQuery !== '' ? <EmptyListPlaceholder /> : null
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {requestStatus === 'failed' && (
        <ErrorView message={moviesMessage} onTryAgain={handleGetMovies} />
      )}
    </SafeView>
  );
};

export default MoviesScreen;

function ListSpacer() {
  return <View style={styles.listSpacerContainer} />;
}

function EmptyListPlaceholder() {
  return (
    <View style={styles.emptyListPlaceholderContainer}>
      <Text>No results found.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginHorizontal: 5,
    rowGap: 10,
  },

  listSpacerContainer: {
    marginBottom: 10,
  },

  emptyListPlaceholderContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
});
