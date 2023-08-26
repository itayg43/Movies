import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Pressable,
  Linking,
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
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import {MovieList} from '../components/movieList';
import errorHandlerUtil from '../utils/errorHandlerUtil';

const MovieDetailsScreen = () => {
  const route = useRoute<MovieDetailsScreenRouteProp>();

  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  const [getMovieDetailsRequestStatus, setGetMovieDetailsRequestStatus] =
    useState<RequestStatus>('loading');
  const [getMovieDetailsErrorMessage, setGetMovieDetailsErrorMessage] =
    useState('');

  const handleGetMovieDetailsById = useCallback(
    async (id: number, signal?: AbortSignal) => {
      try {
        setMovieDetails(await moviesService.getMovieDetailsById(id, signal));
        setGetMovieDetailsRequestStatus('succeded');
      } catch (error) {
        const message = errorHandlerUtil.extractMessage(error);
        setGetMovieDetailsErrorMessage(message);
        setGetMovieDetailsRequestStatus('failed');
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    handleGetMovieDetailsById(route.params.id, controller.signal);

    return () => {
      controller.abort();
    };
  }, [route.params.id, handleGetMovieDetailsById]);

  return (
    <>
      {getMovieDetailsRequestStatus === 'loading' && (
        <LoadingView message="Loading Movie Details..." />
      )}

      {getMovieDetailsRequestStatus === 'succeded' && movieDetails && (
        <ContentView movieDetails={movieDetails} />
      )}

      {getMovieDetailsRequestStatus === 'failed' && (
        <ErrorView
          message={getMovieDetailsErrorMessage}
          onTryAgain={() => handleGetMovieDetailsById(route.params.id)}
        />
      )}
    </>
  );
};

export default MovieDetailsScreen;

type ContentViewProps = {
  movieDetails: MovieDetails;
};

function ContentView({movieDetails}: ContentViewProps) {
  const navigation = useNavigation<MovieDetailsScreenNavigationProp>();

  const handleOpenYouTubeTrialer = () => {
    if (movieDetails.youTubeTrailerUrl) {
      Linking.openURL(movieDetails.youTubeTrailerUrl);
    }
  };

  const handleMovieListItemPress = useCallback(
    (id: number) => {
      navigation.push('movieDetailsScreen', {
        id,
      });
    },
    [navigation],
  );

  const handleCloseButtonPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {/** image */}
      <Image style={styles.image} source={{uri: movieDetails.posterUrl}} />

      {/** close button */}
      <Pressable
        style={styles.closeButtonContainer}
        onPress={handleCloseButtonPress}>
        <MaterialCommunityIcons name="close" size={24} />
      </Pressable>

      {/** details */}
      <View style={styles.detailsContainer}>
        {/** title */}
        <Text style={styles.title}>{movieDetails.title}</Text>

        {/** year & rating & youtube link*/}
        <View style={styles.yearAndRatingContainer}>
          {/** year */}
          <Text style={styles.year}>
            {new Date(movieDetails.releaseDate).getFullYear()}
          </Text>

          {/** dot spacer icon */}
          <MaterialCommunityIcons name="dots-vertical" />

          {/** rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              {movieDetails.voteAverage.toFixed(1)}
            </Text>

            {/** star icon */}
            <MaterialCommunityIcons name="star" color="orange" />
          </View>

          {/** dot spacer icon */}
          <MaterialCommunityIcons name="dots-vertical" />

          {/** youtube link */}
          <Pressable onPress={handleOpenYouTubeTrialer}>
            <MaterialCommunityIcons name="youtube" color="red" size={20} />
          </Pressable>
        </View>

        {/** genres */}
        <ScrollView horizontal contentContainerStyle={styles.genresContainer}>
          {movieDetails.genres.map(g => (
            <Chip key={g}>{g}</Chip>
          ))}
        </ScrollView>

        {/** overview */}
        <Text style={styles.overview}>{movieDetails.overview}</Text>

        {/** recommendations */}
        <>
          <Text style={styles.recommendations}>Recommendations</Text>

          <MovieList
            horizontal
            data={movieDetails.recommendations}
            onPress={handleMovieListItemPress}
          />
        </>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  yearAndRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
  },
  year: {
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
  },
  rating: {
    color: 'gray',
  },
  genresContainer: {
    columnGap: 5,
  },
  overview: {
    fontSize: 14,
  },
  recommendations: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
