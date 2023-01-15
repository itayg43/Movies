import React, {useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Pressable,
  FlatList,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {useAppSelector} from '../../hooks/useAppSelector';
import {
  selectEntity,
  selectRecommendedEntities,
} from '../../redux/movie/movieSelectors';
import {BaseURL} from '../../clients/tmdbClient';
import {MovieDetailsNavigationProp} from '../../navigation/MoviesStackNavigator';
import SafeView from '../SafeView';
import Chip from '../Chip';
import MoviesCategoryList from './MoviesCategoryList';

const youtubeBaseURL = 'https://www.youtube.com/watch?v=';

const MovieDetailsContentView = () => {
  const navigation = useNavigation<MovieDetailsNavigationProp>();

  const entity = useAppSelector(selectEntity);
  const recommendedEntities = useAppSelector(selectRecommendedEntities);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLinking = useCallback(() => {
    Linking.openURL(`${youtubeBaseURL}${entity?.trailerKey}`);
  }, []);

  return (
    <SafeView>
      {entity && (
        <ScrollView>
          {/** image */}
          <Image
            style={styles.image}
            source={{uri: `${BaseURL.originalImage}${entity.posterURL}`}}
          />

          {/** close btn  */}
          <Pressable style={styles.closeButton} onPress={handleClose}>
            <MaterialCommunityIcons name="close" size={22} />
          </Pressable>

          {/** details */}
          <View style={styles.detailsContainer}>
            {/** title */}
            <Text style={styles.title}>{entity.title}</Text>

            {/** year && rating && trailer */}
            <View style={styles.yearAndRatingAndTrailerContainer}>
              {/** year */}
              <Text style={styles.year}>{entity.getReleaseYear()}</Text>

              {/** dot spacer */}
              <MaterialCommunityIcons
                style={styles.dotSpacer}
                name="dots-vertical"
              />

              {/** rating */}
              <View style={styles.ratingContainer}>
                {/** value */}
                <Text style={styles.rating}>{entity.rating}</Text>

                {/** star icon */}
                <MaterialCommunityIcons name="star" color="#ff8000" />
              </View>

              {/** dot spacer */}
              <MaterialCommunityIcons
                style={styles.dotSpacer}
                name="dots-vertical"
              />

              {/** trailer link */}
              <Pressable onPress={handleLinking}>
                <MaterialCommunityIcons
                  name="youtube"
                  size={24}
                  color="#FF0000"
                />
              </Pressable>
            </View>

            {/** genres */}
            <View style={styles.genresContainer}>
              <FlatList
                data={entity.genres}
                renderItem={({item}) => <Chip value={item.value} />}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>

            {/** overview */}
            <Text>{entity.overview}</Text>
          </View>

          {/** recommendations */}
          {recommendedEntities && (
            <View style={styles.recommendationsContainer}>
              <MoviesCategoryList
                category="Recommendations"
                entities={recommendedEntities}
              />
            </View>
          )}
        </ScrollView>
      )}
    </SafeView>
  );
};

export default MovieDetailsContentView;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    start: 10,
    padding: 3,
    borderRadius: 4,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  detailsContainer: {
    marginTop: 10,
    padding: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  yearAndRatingAndTrailerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  year: {
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: 'gray',
    marginEnd: 3,
  },

  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },

  recommendationsContainer: {
    padding: 10,
  },

  dotSpacer: {
    marginHorizontal: 3,
  },
});
