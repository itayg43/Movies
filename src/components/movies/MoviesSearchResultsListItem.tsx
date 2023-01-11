import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import {Movie} from '../../entities/Movie';
import {BaseURL} from '../../clients/tmdbClient';

interface Props {
  item: Movie;
}

const MoviesSearchResultsListItem = ({item}: Props) => {
  return (
    <View style={styles.container}>
      {/** image */}
      <Image
        style={styles.image}
        source={{uri: `${BaseURL.image}${item.posterURL}`}}
      />

      {/** details */}
      <View style={styles.detailsContainer}>
        {/** title */}
        <Text style={styles.title}>{item.title}</Text>

        {/** year */}
        <Text style={styles.year}>{item.getReleaseYear()}</Text>
      </View>
    </View>
  );
};

export default MoviesSearchResultsListItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  image: {
    width: 70,
    height: '100%',
  },

  detailsContainer: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  year: {
    color: 'gray',
  },
});
