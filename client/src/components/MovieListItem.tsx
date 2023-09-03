import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Movie} from '../types';

type Props = {
  item: Movie;
  onPress: () => void;
};

const MovieListItem = ({item, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}>
      {/** image */}
      <Image style={styles.image} source={{uri: item.backdropUrl}} />

      {/** details */}
      <View style={styles.detailsContainer}>
        {/** title */}
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        {/** year & rating */}
        <View style={styles.yearAndRatingContainer}>
          {/** year */}
          <Text style={styles.year}>
            {new Date(item.releaseDate).getFullYear()}
          </Text>

          {/** spacer icon */}
          <MaterialCommunityIcons name="dots-vertical" />

          {/** rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{item.voteAverage.toFixed(1)}</Text>

            {/** star icon */}
            <MaterialCommunityIcons name="star" color="orange" />

            {/** ratings count */}
            <Text style={styles.ratingsCount}>({item.voteCount})</Text>
          </View>
        </View>

        {/** overview */}
        <Text numberOfLines={2}>{item.overview}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '65%',
  },
  detailsContainer: {
    padding: 10,
    rowGap: 5,
  },
  title: {
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
    columnGap: 2,
  },
  rating: {
    color: 'gray',
  },
  ratingsCount: {
    fontSize: 12,
  },
});
