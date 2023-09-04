import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Chip} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

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

const MovieDetailsScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MovieDetailsScreenNavigationProp>();
  const route = useRoute<MovieDetailsScreenRouteProp>();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('loading');
  const movieIdParam = route.params.id;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const movieWatchList = useAppSelector(state =>
    selectWatchListByMovieId(state, movieIdParam),
  );
  const isMovieInWatchList = !!movieWatchList;

  const scrollViewRef = useRef<ScrollView>(null);
  const movieListRef = useRef<FlatList>(null);

  const handleGetMovieDetails = useCallback(async (movieId: number) => {
    try {
      setMovie(await moviesService.getMovieDetailsById(movieId));
      setRequestStatus('succeded');
    } catch (error) {
      setRequestStatus('failed');
    }
  }, []);

  const handleAddWatchList = async () => {
    try {
      await dispatch(watchListAsyncActions.addWatchList(movieIdParam)).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `Successfully added ${movie?.title}`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Couldn't add ${movie?.title}`,
      });
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

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `Successfully removed ${movie?.title}`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Couldn't remove ${movie?.title}`,
      });
    }
  };

  const handleMovieListItemPress = (movieId: number) => {
    navigation.navigate('movieDetailsScreen', {
      id: movieId,
    });

    scrollViewRef.current?.scrollTo({y: 0});
    movieListRef.current?.scrollToIndex({index: 0});
  };

  const handleCloseButtonPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    handleGetMovieDetails(movieIdParam);
  }, [movieIdParam, handleGetMovieDetails]);

  return (
    <>
      {requestStatus === 'loading' && <LoadingView />}

      {requestStatus === 'succeded' && movie && (
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
                <Text style={styles.title}>{movie.title}</Text>

                <MovieYearRatingTrailerSection
                  releaseDate={movie.releaseDate}
                  voteAverage={movie.voteAverage}
                  voteCount={movie.voteCount}
                  trailerUrl={movie.youTubeTrailerUrl}
                />
              </View>

              {/** watch list action */}
              <TouchableOpacity
                style={styles.rowRightSectionContainer}
                onPress={
                  isMovieInWatchList
                    ? handleRemoveWatchList
                    : handleAddWatchList
                }>
                <MaterialCommunityIcons
                  name={
                    isMovieInWatchList ? 'playlist-remove' : 'playlist-plus'
                  }
                  size={24}
                  color="gray"
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

          <Toast />
        </ScrollView>
      )}

      {requestStatus === 'failed' && <View />}
    </>
  );
};

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
