import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Chip, Snackbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

import moviesService from '../services/moviesService';
import {MovieDetails, RequestStatus} from '../types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  MovieDetailsScreenNavigationProp,
  MovieDetailsScreenRouteProp,
} from '../navigators/ExploreStackNavigator';
import MovieYearRatingTrailerSection from '../components/MovieYearRatingTrailerSection';
import MovieListItem from '../components/MovieListItem';
import LoadingView from '../components/LoadingView';
import {useAppDispatch} from '../hooks/useAppDispatch';
import watchListAsyncActions from '../redux/watchList/watchListAsyncActions';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectWatchListByMovieId} from '../redux/watchList/watchListSelectors';
import ErrorView from '../components/ErrorView';

const MovieDetailsScreen = () => {
  const route = useRoute<MovieDetailsScreenRouteProp>();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('loading');
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  const handleGetMovieDetails = useCallback(async (id: number) => {
    try {
      setMovie(await moviesService.getMovieDetailsById(id));
      setRequestStatus('succeded');
    } catch (error) {
      setRequestStatus('failed');
    }
  }, []);

  useEffect(() => {
    handleGetMovieDetails(route.params.id);
  }, [route.params.id, handleGetMovieDetails]);

  return (
    <>
      {requestStatus === 'loading' && <LoadingView />}

      {requestStatus === 'succeded' && movie && <ContentView movie={movie} />}

      {requestStatus === 'failed' && (
        <ErrorView
          message="Couldn't get movie data"
          onRetry={() => handleGetMovieDetails(route.params.id)}
        />
      )}
    </>
  );
};

type ContentViewProps = {
  movie: MovieDetails;
};

function ContentView({movie}: ContentViewProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MovieDetailsScreenNavigationProp>();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const movieWatchList = useAppSelector(state =>
    selectWatchListByMovieId(state, movie.id),
  );
  const isMovieInWatchList = !!movieWatchList;

  const scrollViewRef = useRef<ScrollView>(null);
  const movieListRef = useRef<FlatList>(null);

  const handleAddWatchList = async () => {
    try {
      await dispatch(watchListAsyncActions.addWatchList(movie.id)).unwrap();
      setSnackbarMessage('Movie successfully added');
    } catch (error) {
      setSnackbarMessage("Couldn't add movie");
    } finally {
      setShowSnackbar(true);
    }
  };

  const handleRemoveWatchList = async () => {
    try {
      if (!movieWatchList) {
        return;
      }

      await dispatch(
        watchListAsyncActions.removeWatchList(movieWatchList.id),
      ).unwrap();
      setSnackbarMessage('Movie successfully removed');
    } catch (error) {
      setSnackbarMessage("Couldn't remove movie");
    } finally {
      setShowSnackbar(true);
    }
  };

  const handleMovieListItemPress = (movieId: number) => {
    setShowSnackbar(false);

    navigation.navigate('movieDetailsScreen', {
      id: movieId,
    });

    scrollViewRef.current?.scrollTo({y: 0});
    movieListRef.current?.scrollToIndex({index: 0});
  };

  const handleCloseButtonPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <FastImage
          style={styles.image}
          source={{
            uri: movie.posterUrl,
            priority: 'high',
          }}
          resizeMode="stretch"
        />

        {/** close button */}
        <TouchableOpacity
          style={styles.closeButtonContainer}
          activeOpacity={0.8}
          onPress={handleCloseButtonPress}>
          <MaterialCommunityIcons name="close" size={18} color="#333" />
        </TouchableOpacity>

        {/** details */}
        <View style={styles.detailsContainer}>
          <View style={styles.rowContainer}>
            {/** title & year & rating & trailer */}
            <View style={styles.rowLeftSectionContainer}>
              {/** title */}
              <Text style={styles.title}>{movie.title}</Text>

              {/** year & rating & trailer */}
              <MovieYearRatingTrailerSection
                releaseDate={movie.releaseDate}
                voteAverage={movie.voteAverage}
                voteCount={movie.voteCount}
                trailerUrl={movie.youTubeTrailerUrl}
              />
            </View>

            {/** watch list - add / remove */}
            <TouchableOpacity
              style={styles.rowRightSectionContainer}
              onPress={
                isMovieInWatchList ? handleRemoveWatchList : handleAddWatchList
              }
              disabled={showSnackbar}>
              <MaterialCommunityIcons
                name={isMovieInWatchList ? 'playlist-remove' : 'playlist-plus'}
                size={28}
                color="#333"
              />
            </TouchableOpacity>
          </View>

          {/** genres */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.genresContainer}>
            {movie.genres.map(g => (
              <Chip key={g}>{g}</Chip>
            ))}
          </ScrollView>

          {/** overview */}
          <Text>{movie.overview}</Text>

          {/** recommendations */}
          {movie.recommendations.length > 0 && (
            <>
              <Text style={styles.recommendationsTitle}>Recommendations</Text>

              <FlatList
                ref={movieListRef}
                data={movie.recommendations}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <MovieListItem
                    item={item}
                    onPress={() => handleMovieListItemPress(item.id)}
                    horizontal
                  />
                )}
                initialNumToRender={3}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ListItemSeparator}
              />
            </>
          )}
        </View>
      </ScrollView>

      {showSnackbar && (
        <Snackbar visible onDismiss={() => setShowSnackbar(false)}>
          {snackbarMessage}
        </Snackbar>
      )}
    </>
  );
}

function ListItemSeparator() {
  return <View style={styles.listItemSeparatorContainer} />;
}

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },

  image: {
    width: '100%',
    height: 400,
  },

  closeButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#ddd',
  },

  detailsContainer: {
    padding: 10,
    rowGap: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  rowLeftSectionContainer: {
    flex: 1,
    rowGap: 5,
  },
  rowRightSectionContainer: {
    justifyContent: 'center',
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  genresContainer: {
    columnGap: 5,
  },
  recommendationsTitle: {
    fontWeight: 'bold',
  },

  listItemSeparatorContainer: {
    marginRight: 5,
  },
});
