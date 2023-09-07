import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Movie} from '../types';
import MovieYearRatingTrailerSection from './MovieYearRatingTrailerSection';

type Props = {
  item: Movie;
  onPress: () => void;
  horizontal?: boolean;
};

const MovieListItem = ({item, onPress, horizontal}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, horizontal ? styles.horizontalContainer : null]}
      activeOpacity={0.7}
      onPress={onPress}>
      {/** image */}
      <FastImage style={styles.image} source={{uri: item.backdropUrl}} />

      {/** details */}
      <View style={styles.detailsContainer}>
        {/** title */}
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        {/** year & rating */}
        <MovieYearRatingTrailerSection
          releaseDate={item.releaseDate}
          voteAverage={item.voteAverage}
          voteCount={item.voteCount}
        />

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

  horizontalContainer: {
    width: 300,
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
});
