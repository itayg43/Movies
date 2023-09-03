import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
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

const MovieDetailsScreen = () => {
  const navigation = useNavigation<MovieDetailsScreenNavigationProp>();
  const route = useRoute<MovieDetailsScreenRouteProp>();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  const handleGetMovieDetails = useCallback(async (id: number) => {
    try {
      setRequestStatus('loading');
      setMovieDetails(await moviesService.getMovieDetailsById(id));
      setRequestStatus('succeded');
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      setErrorMessage(message);
      setRequestStatus('failed');
    }
  }, []);

  const handleMovieListItemPress = (movieId: number) => {
    navigation.replace('movieDetailsScreen', {
      id: movieId,
    });
  };

  const handleCloseButtonPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    handleGetMovieDetails(route.params.id);
  }, [route.params.id, handleGetMovieDetails]);

  return (
    <>
      {requestStatus === 'succeded' && movieDetails && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Image style={styles.image} source={{uri: movieDetails.posterUrl}} />

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

            {/** overview */}
            <Text>{movieDetails.overview}</Text>

            {/** recommendations */}
            <Text style={styles.recommendationsTitle}>Recommendations</Text>

            <FlatList
              data={movieDetails.recommendations}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <MovieListItem
                  item={item}
                  onPress={() => handleMovieListItemPress(item.id)}
                  horizontal
                />
              )}
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
    height: 350,
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
  recommendationsTitle: {
    fontWeight: 'bold',
  },

  listItemSeparatorContainer: {
    marginRight: 5,
  },
});
