import React, {useCallback} from 'react';
import {StyleSheet, View, ImageBackground, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Movie} from '../../entities/Movie';
import {BaseURL} from '../../clients/tmdbClient';
import {MoviesScreenNavigationProp} from '../../navigation/MoviesStackNavigator';

interface Props {
  item: Movie;
  showLargeImage?: boolean;
}

const MoviesCategoryListItem = ({item, showLargeImage = false}: Props) => {
  const navigation = useNavigation<MoviesScreenNavigationProp>();

  const handleSelection = useCallback(() => {
    navigation.navigate('movieDetailsScreen', {
      id: item.mid ?? 0,
    });
  }, [navigation]);

  return (
    <Pressable onPress={handleSelection}>
      <ImageBackground
        style={[styles.image, showLargeImage && {height: 400}]}
        source={{
          uri: `${
            showLargeImage ? BaseURL.originalImage : BaseURL.resizedImage
          }${item.posterURL}`,
        }}>
        {/** details */}
        <View style={styles.detailsContainer}>
          {/** title */}
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>

          {/** year && rating */}
          <View style={styles.yearAndRatingContainer}>
            {/** year */}
            <Text style={styles.year}>{item.getReleaseYear()}</Text>

            {/** dot spacer */}
            <MaterialCommunityIcons
              style={styles.dotSpacer}
              name="dots-vertical"
            />

            {/** rating */}
            <View style={styles.ratingContainer}>
              {/** value */}
              <Text style={styles.rating}>{item.rating}</Text>

              {/** star icon */}
              <MaterialCommunityIcons name="star" color="#ff8000" />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default MoviesCategoryListItem;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    marginEnd: 10,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  detailsContainer: {
    padding: 10,
    backgroundColor: '#eee',
  },

  title: {
    fontWeight: 'bold',
  },

  yearAndRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
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

  dotSpacer: {
    marginHorizontal: 3,
  },
});
