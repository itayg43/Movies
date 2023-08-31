import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Chip} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  MovieDetailsScreenNavigationProp,
  MovieDetailsScreenRouteProp,
} from '../navigators/MoviesStackNavigator';
import {MovieDetails, RequestStatus} from '../types';
import moviesService from '../services/moviesService';
import MovieListItem from '../components/MovieListItem';
import errorHandlerUtil from '../utils/errorHandlerUtil';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import YearRatingTrailerLinkSection from '../components/YearRatingTrailerLinkSection';
import {useAppDispatch, useAppSelector} from '../hooks';
import watchlistActions from '../redux/watchlist/watchlistActions';
import {selectWatchlist} from '../redux/watchlist/watchlistSelectors';

const MovieDetailsScreen = () => {
  const route = useRoute<MovieDetailsScreenRouteProp>();
  const navigation = useNavigation<MovieDetailsScreenNavigationProp>();

  const movieId = route.params.id;

  const dispatch = useAppDispatch();

  const watchlist = useAppSelector(selectWatchlist);

  const watchlistItem = watchlist.find(w => w.movie.id === movieId);

  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGetDetails = useCallback(async (id: number) => {
    try {
      setRequestStatus('loading');
      setDetails(await moviesService.getMovieDetailsById(id));
      setRequestStatus('succeded');
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      setErrorMessage(message);
      setRequestStatus('failed');
    }
  }, []);

  const handleCloseButtonPress = () => {
    navigation.goBack();
  };

  const handleMovieListItemPress = (id: number) => {
    navigation.navigate('movieDetailsScreen', {
      id,
    });
  };

  const handleHeartIconPress = async () => {
    try {
      watchlistItem
        ? await dispatch(
            watchlistActions.deleteWatchlistItem(watchlistItem.id),
          ).unwrap()
        : await dispatch(watchlistActions.addToWatchlist(movieId)).unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    handleGetDetails(movieId);
  }, [movieId, handleGetDetails]);

  return (
    <>
      {requestStatus === 'loading' && (
        <LoadingView message="Loading Movie Details..." />
      )}

      {requestStatus === 'succeded' && details && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {/** image */}
          <Image style={styles.image} source={{uri: details.posterUrl}} />

          {/** close button */}
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={handleCloseButtonPress}>
            <MaterialCommunityIcons name="close" size={24} />
          </TouchableOpacity>

          {/** details */}
          <View style={styles.detailsContainer}>
            <View style={styles.titleYearRatingTrailerHeartContainer}>
              {/** title & year & rating & trailer link */}
              <View style={styles.titleYearRatingTrailerContainer}>
                <Text style={styles.title}>{details.title}</Text>

                <YearRatingTrailerLinkSection
                  releaseDate={details.releaseDate}
                  voteAverage={details.voteAverage}
                  voteCount={details.voteCount}
                  trailerLink={details.youTubeTrailerUrl}
                />
              </View>

              {/** heart icon */}
              <TouchableOpacity onPress={handleHeartIconPress}>
                <MaterialCommunityIcons
                  name={watchlistItem ? 'heart' : 'heart-outline'}
                  color={watchlistItem ? 'red' : 'gray'}
                  size={24}
                />
              </TouchableOpacity>
            </View>

            {/** genres */}
            <ScrollView
              horizontal
              contentContainerStyle={styles.genresContainer}
              showsHorizontalScrollIndicator={false}>
              {details.genres.map(g => (
                <Chip key={g}>{g}</Chip>
              ))}
            </ScrollView>

            {/** overview */}
            <Text style={styles.overview}>{details.overview}</Text>

            {/** recommendations */}
            {details.recommendations.length > 0 && (
              <>
                <Text style={styles.recommendationsTitle}>Recommendations</Text>

                <FlatList
                  data={details.recommendations}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <MovieListItem
                      item={item}
                      onPress={() => handleMovieListItemPress(item.id)}
                      horizontal
                    />
                  )}
                  horizontal
                  ItemSeparatorComponent={ListSpacer}
                  showsHorizontalScrollIndicator={false}
                />
              </>
            )}
          </View>
        </ScrollView>
      )}

      {requestStatus === 'failed' && (
        <ErrorView
          message={errorMessage}
          onTryAgain={() => handleGetDetails(movieId)}
        />
      )}
    </>
  );
};

export default MovieDetailsScreen;

function ListSpacer() {
  return <View style={styles.listSpacerContainer} />;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },

  image: {
    width: '100%',
    height: 450,
    resizeMode: 'stretch',
  },

  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: '#eee',
  },

  detailsContainer: {
    padding: 10,
    rowGap: 10,
  },
  titleYearRatingTrailerHeartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleYearRatingTrailerContainer: {
    flex: 1,
    rowGap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  genresContainer: {
    columnGap: 5,
  },
  overview: {
    fontSize: 14,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  listSpacerContainer: {
    marginRight: 5,
  },
});
