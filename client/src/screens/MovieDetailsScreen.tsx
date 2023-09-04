import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Chip} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import moviesService from '../services/moviesService';
import {MovieDetails, RequestStatus} from '../types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  MovieDetailsScreenNavigationProp,
  MovieDetailsScreenRouteProp,
} from '../navigators/ExploreStackNavigator';
import errorHandlerUtil from '../utils/errorHandlerUtil';
import MovieYearRatingTrailerSection from '../components/MovieYearRatingTrailerSection';
import MovieListItem from '../components/MovieListItem';
import LoadingView from '../components/LoadingView';

const MovieDetailsScreen = () => {
  const navigation = useNavigation<MovieDetailsScreenNavigationProp>();
  const route = useRoute<MovieDetailsScreenRouteProp>();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);
  const movieListRef = useRef<FlatList>(null);

  const handleGetMovieDetails = useCallback(async (id: number) => {
    try {
      setMovieDetails(await moviesService.getMovieDetailsById(id));
      setRequestStatus('succeded');
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      setErrorMessage(message);
      setRequestStatus('failed');
    }
  }, []);

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
    handleGetMovieDetails(route.params.id);
  }, [route.params.id, handleGetMovieDetails]);

  return (
    <>
      {requestStatus === 'loading' && <LoadingView />}

      {requestStatus === 'succeded' && movieDetails && (
        <ScrollView
          ref={scrollViewRef}
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Image
            style={styles.image}
            source={{uri: movieDetails.posterUrl}}
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
            {/** title */}
            <Text style={styles.title}>{movieDetails.title}</Text>

            <MovieYearRatingTrailerSection
              releaseDate={movieDetails.releaseDate}
              voteAverage={movieDetails.voteAverage}
              voteCount={movieDetails.voteCount}
              trailerUrl={movieDetails.youTubeTrailerUrl}
            />

            {/** genres */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.genresContainer}>
              {movieDetails.genres.map(g => (
                <Chip key={g}>{g}</Chip>
              ))}
            </ScrollView>

            {/** overview */}
            <Text>{movieDetails.overview}</Text>

            {/** recommendations */}
            <Text style={styles.recommendationsTitle}>Recommendations</Text>

            <FlatList
              ref={movieListRef}
              data={movieDetails.recommendations}
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
          </View>
        </ScrollView>
      )}
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
