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
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  MovieDetailsScreenNavigationProp,
  MovieDetailsScreenRouteProp,
} from '../navigators/MoviesStackNavigator';
import {MovieDetails, RequestStatus} from '../types';
import moviesService from '../services/moviesService';
import {MovieList} from '../components/movieList';
import errorHandlerUtil from '../utils/errorHandlerUtil';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import Rating from '../components/Rating';
import Genres from '../components/Genres';

const MovieDetailsScreen = () => {
  const route = useRoute<MovieDetailsScreenRouteProp>();

  const movieId = route.params.id;

  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGetDetails = useCallback(
    async (id: number, signal?: AbortSignal) => {
      try {
        setDetails(await moviesService.getMovieDetailsById(id, signal));
        setRequestStatus('succeded');
      } catch (error) {
        const message = errorHandlerUtil.extractMessage(error);
        setErrorMessage(message);
        setRequestStatus('failed');
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    handleGetDetails(movieId, controller.signal);

    return () => {
      controller.abort();
    };
  }, [movieId, handleGetDetails]);

  return (
    <>
      {requestStatus === 'loading' && (
        <LoadingView message="Loading Movie Details..." />
      )}

      {requestStatus === 'succeded' && details && (
        <ContentView details={details} />
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

type ContentViewProps = {
  details: MovieDetails;
};

function ContentView({details}: ContentViewProps) {
  const navigation = useNavigation<MovieDetailsScreenNavigationProp>();

  const handleCloseButtonPress = () => {
    navigation.goBack();
  };

  const handleTrailerLinkPress = () => {
    if (details.youTubeTrailerUrl) {
      Linking.openURL(details.youTubeTrailerUrl);
    }
  };

  const handleMovieListItemPress = (id: number) => {
    navigation.push('movieDetailsScreen', {
      id,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/** image */}
      <Image style={styles.image} source={{uri: details.posterUrl}} />

      {/** close button */}
      <Pressable
        style={styles.closeButtonContainer}
        onPress={handleCloseButtonPress}>
        <MaterialCommunityIcons name="close" size={24} />
      </Pressable>

      {/** details */}
      <View style={styles.detailsContainer}>
        {/** title */}
        <Text style={styles.title}>{details.title}</Text>

        {/** year & rating & youtube link */}
        <View style={styles.yearAndRatingContainer}>
          {/** year */}
          <Text style={styles.year}>
            {new Date(details.releaseDate).getFullYear()}
          </Text>

          {/** dot spacer icon */}
          <MaterialCommunityIcons name="dots-vertical" />

          {/** rating */}
          <Rating value={details.voteAverage} />

          {/** dot spacer icon */}
          <MaterialCommunityIcons name="dots-vertical" />

          {/** youtube link */}
          <Pressable onPress={handleTrailerLinkPress}>
            <MaterialCommunityIcons name="youtube" color="red" size={20} />
          </Pressable>
        </View>

        {/** genres */}
        <Genres values={details.genres} />

        {/** overview */}
        <Text style={styles.overview}>{details.overview}</Text>

        {/** recommendations */}
        <>
          <Text style={styles.recommendations}>Recommendations</Text>

          <MovieList
            horizontal
            data={details.recommendations}
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
  overview: {
    fontSize: 14,
  },
  recommendations: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
