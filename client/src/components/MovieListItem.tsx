import React from 'react';
import {StyleSheet, Pressable, Text, Image, View} from 'react-native';

import {Movie} from '../types';
import YearRatingTrailerLinkSection from './YearRatingTrailerLinkSection';

type Props = {
  item: Movie;
  onPress: () => void;
  horizontal?: boolean | undefined;
};

const MovieListItem = ({item, onPress, horizontal}: Props) => {
  return (
    <Pressable
      style={[styles.container, horizontal ? styles.horizontalContainer : null]}
      onPress={onPress}>
      <Image
        style={styles.image}
        source={{uri: item.backdropUrl ?? item.posterUrl}}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <YearRatingTrailerLinkSection
          releaseDate={item.releaseDate}
          voteAverage={item.voteAverage}
          voteCount={item.voteCount}
        />

        <Text numberOfLines={2}>{item.overview}</Text>
      </View>
    </Pressable>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
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
    flex: 1,
    padding: 10,
    rowGap: 5,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
