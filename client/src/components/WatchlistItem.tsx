import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Watchlist} from '../types';
import YearRatingTrailerLinkSection from './YearRatingTrailerLinkSection';

type Props = {
  item: Watchlist;
};

const WatchlistItem = ({item}: Props) => {
  return (
    <View style={styles.container}>
      {/** image */}
      <Image
        style={styles.image}
        source={{uri: item.movie.backdropUrl ?? item.movie.posterUrl}}
      />

      <View style={styles.detailsContainer}>
        {/** title */}
        <Text style={styles.title}>{item.movie.title}</Text>

        {/** year & rating */}
        <YearRatingTrailerLinkSection
          releaseDate={item.movie.releaseDate}
          voteAverage={item.movie.voteAverage}
          voteCount={item.movie.voteCount}
        />

        {/** overview */}
        <Text style={styles.overview} numberOfLines={2}>
          {item.movie.overview}
        </Text>

        {/** date added */}
        <Text style={styles.addedAt}>
          Added On: {new Date(item.createdAt).toLocaleDateString('he-IL')}
        </Text>
      </View>
    </View>
  );
};

export default WatchlistItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 125,
    borderRadius: 4,
    backgroundColor: 'white',
  },

  image: {
    width: 125,
    height: '100%',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  detailsContainer: {
    flex: 1,
    padding: 10,
    rowGap: 5,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  overview: {
    color: 'gray',
  },
  addedAt: {
    color: 'gray',
    fontSize: 12,
  },
});
