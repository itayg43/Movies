import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, FlatList, ScrollView, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {Movie, MoviesCategory, RequestStatus} from '../types';
import SafeView from '../components/SafeView';
import MovieListItem from '../components/MovieListItem';
import moviesService from '../services/moviesService';
import {ExploreScreenNavigationProp} from '../navigators/ExploreStackNavigator';
import LoadingView from '../components/LoadingView';

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

const ExploreScreen = () => {
  const navigation = useNavigation<ExploreScreenNavigationProp>();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('loading');
  const [selectedCategory, setSelectedCategory] = useState<MoviesCategory>(
    CATEGORIES[0],
  );
  const [movies, setMovies] = useState<Movie[]>([]);

  const movieListRef = useRef<FlatList>(null);

  const handleGetMoviesByCategory = useCallback(
    async (category: MoviesCategory) => {
      try {
        setMovies(await moviesService.getMoviesByCategory(category));
        setRequestStatus('succeded');
      } catch (error) {
        setRequestStatus('failed');
      }
    },
    [],
  );

  const handleCategoryChange = (category: MoviesCategory) => {
    setSelectedCategory(category);

    movieListRef.current?.scrollToIndex({index: 0});
  };

  const handleMovieListItemPress = (movieId: number) => {
    navigation.navigate('movieDetailsScreen', {
      id: movieId,
    });
  };

  useEffect(() => {
    handleGetMoviesByCategory(selectedCategory);
  }, [selectedCategory, handleGetMoviesByCategory]);

  return (
    <>
      {requestStatus === 'loading' && <LoadingView />}

      {requestStatus === 'succeded' && (
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
                textStyle={styles.categoryText}
                selected={c === selectedCategory}
                onPress={() => handleCategoryChange(c)}
                compact>
                {c.key}
              </Chip>
            ))}
          </ScrollView>

          {/** movie list */}
          <FlatList
            ref={movieListRef}
            data={movies}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <MovieListItem
                item={item}
                onPress={() => handleMovieListItemPress(item.id)}
              />
            )}
            initialNumToRender={3}
            ItemSeparatorComponent={ListItemSeparator}
            ListFooterComponent={ListFooter}
            showsVerticalScrollIndicator={false}
          />
        </SafeView>
      )}
    </>
  );
};

function ListItemSeparator() {
  return <View style={styles.marginBottomSpacer} />;
}

function ListFooter() {
  return <View style={styles.marginBottomSpacer} />;
}

export default ExploreScreen;

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

  marginBottomSpacer: {
    marginBottom: 10,
  },
});
