import React, {useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Pressable,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {useAppSelector} from '../../hooks/useAppSelector';
import {selectEntity} from '../../redux/movie/movieSelectors';
import {BaseURL} from '../../clients/tmdbClient';
import {MovieDetailsNavigationProp} from '../../navigation/MoviesStackNavigator';
import SafeView from '../SafeView';
import Chip from '../Chip';

const MovieDetailsContentView = () => {
  const navigation = useNavigation<MovieDetailsNavigationProp>();

  const entity = useAppSelector(selectEntity);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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

            {/** year && rating */}
            <View style={styles.yearAndRatingContainer}>
              {/** year */}
              <Text style={styles.year}>{entity.getReleaseYear()}</Text>

              {/** dot spacer */}
              <MaterialCommunityIcons
                style={styles.dotSpacer}
                name="dots-vertical"
              />

              {/** vote avg */}
              <View style={styles.ratingContainer}>
                {/** value */}
                <Text style={styles.rating}>{entity.rating}</Text>

                {/** star icon */}
                <MaterialCommunityIcons name="star" color="#ff8000" />
              </View>
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
            <Text style={styles.overview}>{entity.overview}</Text>
          </View>
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
  },

  detailsContainer: {
    marginTop: 10,
    padding: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  yearAndRatingContainer: {
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

  overview: {},

  dotSpacer: {
    marginHorizontal: 3,
  },
});
